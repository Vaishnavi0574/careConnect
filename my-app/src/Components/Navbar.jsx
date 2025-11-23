import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoIosLogIn } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore"; // ✅ Zustand import

const Navbar = ({ isLoginClick, handleLoginClick }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthStore(); // ✅ access logged in user

  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };
 


  return (
    <div className="sticky top-0 bg-[#052659] z-50">
      <div className="flex justify-center bg-[transparent] pt-1">
        <div className="text-[#bdd8e9] p-2 md:p-4 max-w-[90%] flex justify-between items-center w-full border-b-[0.5px] border-[#bdd8e9] relative z-10">
          {/* Logo */}
          <div>
            
            <span className="text-2xl font-semibold md:text-4xl">CareConnect</span>
          </div>

          {/* Desktop Menu */}
          <ul className="list-none hidden lg:flex gap-5 lg:gap-13 text-lg">
            <li
              onClick={() => handleScroll("Home")}
              className="inline-block mx-4 hover:cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => handleScroll("About")}
              className="inline-block mx-4 hover:cursor-pointer"
            >
              About
            </li>
            <li
              onClick={() => navigate("/dashboard")}
              className="inline-block mx-4 hover:cursor-pointer"
            >
              Request
            </li>
            <li
              onClick={() => handleScroll("Contact")}
              className="inline-block mx-4 hover:cursor-pointer"
            >
              Contact Us
            </li>
          </ul>

          {/* Buttons & Hamburger */}
          <div className="flex gap-4 items-center">
            {/* ✅ If not logged in, show Login button */}
            {!user ? (
              <button
                className="bg-[#bdd8e9] flex items-center text-[#052659] hover:bg-[#8bb5cf] rounded-full text-sm lg:text-[1.1rem]"
                onClick={handleLoginClick}
              >
                <p className="hidden sm:block px-2 py-1 md:px-4 md:py-1.2">
                  Log In
                </p>
                <IoIosLogIn className="block px-1 py-1 sm:hidden w-6 h-6" />
              </button>
            ) : (
              // ✅ If logged in, show profile avatar instead of button
              <div
                className="w-8 h-8 rounded-full overflow-hidden cursor-pointer border-2 border-[#bdd8e9] hover:scale-105 transition-transform"
                onClick={() => navigate("/dashboard")}
              >
                <img
                  src={
                    user.profileImage ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="profile"
                  className="w-8 h-8 object-cover"
                />
              </div>
            )}

            {/* Hamburger Icon (mobile) */}
            <div
              className="lg:hidden text-3xl text-white cursor-pointer"
              onClick={handleMenuClick}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMenuOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {isMenuOpen ? <IoClose /> : <FiMenu />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white/60 backdrop-blur-lg z-50 transform transition-all duration-1000 ease-in-out shadow-md overflow-hidden lg:hidden ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-start space-y-4 p-5">
          <li
            onClick={() => {
              handleScroll("Home");
              handleMenuClick();
            }}
            className="text-xl text-[#052659] hover:cursor-pointer"
          >
            Home
          </li>
          <li
            onClick={() => {
              handleScroll("About");
              handleMenuClick();
            }}
            className="text-xl text-[#052659] hover:cursor-pointer"
          >
            About
          </li>
          <li
            onClick={() => {
              navigate("/dashboard");
              handleMenuClick();
            }}
            className="text-xl text-[#052659] hover:cursor-pointer"
          >
            Request
          </li>
          <li
            onClick={() => {
              handleScroll("Contact");
              handleMenuClick();
            }}
            className="text-xl text-[#052659] hover:cursor-pointer"
          >
            Contact Us
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
