import express from "express";
import { submitRequest,getMyRequests, getAllRequests, acceptRequest, getMyTasks } from "../controllers/requestController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/submitRequest", protect, submitRequest);
router.get("/myrequests", protect, getMyRequests);
router.get("/mytasks", protect, getMyTasks);
router.get("/allrequests", protect, getAllRequests);
router.put("/accept/:id", protect, acceptRequest);

export default router;
