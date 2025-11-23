import { IoIosTimer } from "react-icons/io";
import { IoOptionsSharp } from "react-icons/io5";
import { MdOutlineQuickreply } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";

 const data = [
  {
    title: "Post in Seconds",
    description: "Quickly share your needs with details like budget, deadline, and location. Nearby volunteers see your request instantly and can respond right away."
    ,
    icon: MdOutlineQuickreply
  },
  {
    title: "Pick & Negotiate",
    description: "Volunteers choose tasks that suit them and can negotiate prices directly with requesters. This ensures fair deals and flexibility for both sides."
    ,
    icon: IoOptionsSharp
  },
  {
    title: "Short or Long Term",
    description: "From urgent one-time help like groceries to longer commitments such as a week of nursing, the platform adapts to different support needs.",
    icon: IoIosTimer
  },
  {
    title: "Affordable & Local",
    description: "No hidden charges—just simple, community-driven help. Students, neighbors, and locals can earn while supporting each other affordably."
    ,
    icon: TbPigMoney
  }
];

export default data;