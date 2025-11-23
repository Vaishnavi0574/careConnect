import Request from "../models/requestModel.js";
import statusRequest from "../models/statusrequestModel.js";


export const submitRequest = async (req, res) => {
  try {
    const userId = req.user?._id;
    const userName = req.user?.name;
    const userEmail = req.user?.email;

    const {
      category,
      price,
      negotiable,
      term,
      startDate,
      endDate,
      description,
      requestingFor,
      name,
      phone,
      address,
      additionalInstructions,
      urgency,
    } = req.body;

    // Required checks
    if (!category || !price || !term || !description || !requestingFor || !urgency) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    if (term === "long") {
      if (!startDate || !endDate) {
        return res.status(400).json({ message: "Start and end dates are required for long-term requests." });
      }
    }

    if (requestingFor === "someone") {
      if (!name || !address) {
        return res.status(400).json({ message: "Name and address are required when requesting for someone else." });
      }
    }

    // Create request
    const newRequest = await Request.create({
      createdBy: userId,
      userName,
      userEmail,
      category,
      price,
      negotiable,
      term,
      startDate: term === "long" ? startDate : null,
      endDate: term === "long" ? endDate : null,
      description,
      requestingFor,
      name: requestingFor === "someone" ? name : null,
      phone,
      address: requestingFor === "someone" ? address : null,
      additionalInstructions,
      urgency,
    });

    //  Create status row
    await statusRequest.create({
      requestId: newRequest._id,
      createdBy: userId,
      currentStatus: "created",
    });

    //  Emit notification to all connected clients
    if (req.io) {
      req.io.emit("newRequest", {
        _id: newRequest._id,
        category: newRequest.category,
        description: newRequest.description,
        createdBy: { _id: userId, name: userName },
        urgency: newRequest.urgency,
      });
    }

    return res.status(201).json({
      message: "Request submitted successfully!",
      request: newRequest,
    });

  } catch (error) {
    console.error("Submit Request Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const getAllRequests = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { category } = req.query;  // <-- must receive from UI
    // console.log("Category filter received:", category);

    const requests = await Request.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email profileImage");

    const statusRows = await statusRequest.find({ currentStatus: "created" });
    const createdRequestIds = statusRows.map(s => s.requestId.toString());

    // Normalize selected category
    const selectedCategory = category ? category.trim().toUpperCase() : null;

    const filteredRequests = requests.filter(reqDoc => {
      const validStatus = createdRequestIds.includes(reqDoc._id.toString());
      const notCreator = reqDoc.createdBy._id.toString() !== currentUserId;

      // Normalize DB category
      const dbCategory = reqDoc.category
        ? reqDoc.category.trim().toUpperCase()
        : "";

      const categoryMatch = selectedCategory
        ? dbCategory === selectedCategory
        : true;

      return validStatus && notCreator && categoryMatch;
    });

    return res.status(200).json({
      count: filteredRequests.length,
      requests: filteredRequests,
    });
  } catch (error) {
    console.error("Get All Requests Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getMyRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all requests created by user
    const myRequests = await Request.find({ createdBy: userId });

    // Get status rows for these requests
    const statusRows = await statusRequest.find({
      requestId: { $in: myRequests.map(r => r._id) }
    });

    // Convert to map for quick lookup
    const statusMap = {};
    statusRows.forEach(s => {
      statusMap[s.requestId] = s.currentStatus;
    });

    const pending = [];
    const completed = [];

    myRequests.forEach(reqItem => {
      const status = statusMap[reqItem._id] || "created";

      if (status === "completed") {
        completed.push(reqItem);
      } else {
        pending.push(reqItem);
      }
    });

    return res.json({
      success: true,
      pendingRequests: pending,
      completedRequests: completed,
    });
  } catch (error) {
    console.error(" getMyRequests error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getMyTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const rows = await statusRequest
      .find({ acceptedBy: userId })
      .populate("requestId"); // load request details

    const pendingTasks = [];
    const completedTasks = [];

    rows.forEach(row => {
      if (!row.requestId) return; // skip broken rows

      const taskData = {
        _id: row._id,
        description: row.requestId.description,
        category: row.requestId.category,
        status: row.currentStatus,
        // add any other fields needed for UI
      };

      if (row.currentStatus === "completed") {
        completedTasks.push(taskData);
      } else {
        pendingTasks.push(taskData);
      }
    });

    return res.status(200).json({
      success: true,
      pendingTasks,
      completedTasks
    });

  } catch (error) {
    console.error(" getMyTasks error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};



export const acceptRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Get status row
    let statusRow = await statusRequest.findOne({ requestId });

    if (!statusRow) {
      // Create new
      statusRow = await statusRequest.create({
        requestId,
        createdBy: request.createdBy,
        acceptedBy: userId,
        currentStatus: "accepted",
      });
    } else {
      // Already accepted by someone else?
      if (statusRow.acceptedBy) {
        return res.status(400).json({ message: "Already accepted by someone else" });
      }

      // Update fields
      statusRow.acceptedBy = userId;
      statusRow.currentStatus = "accepted";
      await statusRow.save();
    }

    return res.status(200).json({
      message: "Request accepted successfully!",
      statusRow,
    });

  } catch (error) {
    console.error("Accept Request Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
