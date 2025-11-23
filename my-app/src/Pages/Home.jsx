import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import data from "../assets/Data/Cards_data.js";
import communityHome from "../assets/images/communityHome.jpg"; 
import Cards from "../Components/Cards";
import Service_card from "../Components/Service_card";
import service_data from "../assets/Data/service_data.js";
import Number_cards from   "../Components/Number_cards.jsx";
import Number_data from "../assets/Data/Number_data.js";
import { FaArrowLeft, FaArrowRight, FaCheck, FaFacebook, FaLinkedin, FaQuoteLeft, FaTwitter, FaYoutube } from "react-icons/fa";
import contactItems from "../assets/Data/Contact_data.js";
import Contact from "../Components/Contact.jsx";
import Footer from "../assets/images/footer.jpg";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { BiSolidQuoteSingleLeft } from "react-icons/bi";
import Review_data from "../assets/Data/Review_data.js";
import ReviewCard from "../Components/ReviewCard.jsx";
import { motion, AnimatePresence } from "framer-motion";
import Login from "../Components/Login.jsx";
import useLoginStore from "../store/useLoginStore.js";



const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  // const [isLoginClick,setIsloginClick]=useState(false);
  const [reviewsPerPage,setreviewPerPage] = useState(3);
  const [noofServiceCard,setServiceCard] =useState(9);
  const [isServiceCard,setIsServiceCard] =useState(true);
  const { isLoginClick, setIsloginClick } = useLoginStore();

  const [direction, setDirection] = useState(0);
  const startIndex = currentPage * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;

  
  const handleLoginClick=()=>{ 
    setIsloginClick(!isLoginClick)
     
  }

  const handleNext = () => {
    if (endIndex < Review_data.length) {
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleReviewPerPage=()=>{
    if(window.innerWidth<640){
      setreviewPerPage(2);
      setIsServiceCard(true)
      setServiceCard(3)
    }else{
      setreviewPerPage(3)
      setIsServiceCard(false)
      setServiceCard(9)
    }
  }

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  useEffect(() => {
    handleReviewPerPage();
    window.addEventListener("resize", handleReviewPerPage);
    return () => {
      window.removeEventListener("resize", handleReviewPerPage);
    };
  }, []);
  
  return (
    <div className="">
        <Navbar isLoginClick={isLoginClick} handleLoginClick={handleLoginClick}/>
        {isLoginClick && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <Login  handleLoginClick={handleLoginClick}/>
          </div>
        )}

        {/* home */}
      <div id="Home" className=" text-white sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[90vh] relative bg-no-repeat bg-cover bg-center bg-transition-all duration-500 ease-in-out flex items-center "
        style={{ backgroundImage: `url(${communityHome})` }}
      >
        

        <div className="max-w-[90%] text-center grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-12 
        min-h-[25rem] lg:min-h-[40rem] mx-auto items-center">
          <div className="flex flex-col gap-5 items-center md:items-start">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold md:text-left max-w-full xl:max-w-[70%]">
              Welcome to our Help Services
            </h2>
            <div className="text-sm sm:text-base lg:text-lg md:text-left max-w-full xl:max-w-[85%]">
              Connect with your neighbors, exchange skills, and create lasting bonds. Share your knowledge, learn from others, and work together to build a stronger, more vibrant community.
            </div>
          </div>
        </div>

        <div className="absolute bottom-[-1.75rem] left-0 right-0 w-full z-0">
          <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="w-full h-[60px] sm:h-[90px] md:h-[120px] lg:h-[150px] fill-white "
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0,192L80,170.7C160,149,320,107,480,106.7C640,107,800,149,960,149.3C1120,149,1280,107,1360,85.3L1440,64L1440,320L0,320Z"></path>
          </svg>
        </div>
      </div>

        {/* images wala */}
      <div className="bg-white text-black my-4 sm:my-10 md:my-20 max-w-[90%] flex flex-col lg:flex-row items-start justify-between mx-auto p-6 gap-10 ">
        <div className=" w-full flex items-center justify-center gap-5">
          <div className=" w-full  flex justify-between relative">
            <div className="flex flex-col px-2 py-1 shadow-[rgba(0,0,0,0.15)] bg-white shadow-md absolute top-[-1rem] left-[-1.5rem] sm:left-0 rounded-xs justify-evenly">
              <h1 className="text-2xl sm:text-[2rem] font-bold">100+</h1>
              <p className="font-semibold text-[0.6rem] sm:text-xs sm:text-md">cities being served</p>
            </div>
            <div className="flex flex-col gap-4 items-end">
              <img src="src/assets/images/gardening.jpg" alt="img" className="max-w-[95%] sm:max-w-[80%]" />
              <img src="src/assets/images/delivery.jpg" alt="img" className="max-w-[95%] sm:max-w-[80%]"/>
            </div>
          </div>
          <div className="w-full flex justify-between relative">
            <div className="flex flex-col items-center relative">
              <img src="src/assets/images/elders.jpg" alt="img" className="w-full h-full object-cover"/>
              <div className="flex flex-col px-2 py-1 shadow-[rgba(0,0,0,0.15)] bg-white shadow-md rounded-xs justify-evenly items-center absolute bottom-[-3rem]">
              <h1 className="text-2xl sm:text-[2rem] font-bold">3K+</h1>
              <p className="font-semibold text-[0.6rem] sm:text-xs sm:text-md">people connected</p>
            </div>
            </div>
          </div>
        </div>

        <div className=" w-full  min-h-[25rem] flex flex-col justify-between items-start gap-3 ">
          <button className="border-2 rounded-3xl px-4 py-1 text-[#052659] border-black hover:cursor-pointer" onClick={()=>{handleScroll("About")}}>Know More</button>
          <h3 className="text-3xl sm:text-4xl font-semibold">From Request to Relief, Effortlessly</h3>
          <p className="text-sm xl:text-[1rem] ">"Welcome to a platform where kindness meets action.
              Post your needs instantly and connect with willing volunteers nearby.
              Whether it’s a quick errand or long-term help, we make it simple, fair, and community-driven.
              Together, let’s build a world where everyone lends a helping hand."
          </p>
          <ul className="list- list-inside text-sm xl:text-[1rem] ">
            <li className="flex items-center gap-4">
              <FaCheck className="text-[#052659]" />
              Instantly post requests for nearby help
            </li>
            <li className="flex items-center gap-4">
              <FaCheck className="text-[#052659]" />
              Volunteers choose and negotiate their tasks
            </li>
            <li className="flex items-center gap-4">
              <FaCheck className="text-[#052659]" />
              Support both short-term and long-term needs
            </li>
            <li className="flex items-center gap-4">
              <FaCheck className="text-[#052659]" />
              Affordable community-driven assistance without hidden charges
            </li>
            <li className="flex items-center gap-4">
              <FaCheck className="text-[#052659]" />
              Real-time request updates for faster responses
            </li>

          </ul>
          <button className=" rounded-3xl px-6 py-2 bg-[#052659] text-[#bdd8e9] text-md hover:cursor-pointer" onClick={()=>{handleLoginClick()}}>Connect Now →</button>
        </div>

      </div>

      {/* card-section */}
      <div className="bg-[#052659] min-h-[30rem] flex items-center justify-evenly py-15 lg:p-6 ">
        <div className="w-[75%] xs:w-[60%] sm:w-[70%] lg:w-[96%] xl:w-[90%]  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center lg:gap-0 gap-6">
          
            {data.map((card, index) => (
                <Cards key={index} 
                title={card.title}
                       desc={card.description}
                icon={card.icon}
                        />
            ))
        }
        </div>
        
      </div>
        
      {/* Service-about */}
      <div id="About" className="bg-white text-black  flex items-center justify-center p-6 pt-15">
          <div className="lg:w-[90%] m-4 p-4 flex items-center justify-center flex-col text-[#23689d] gap-6">
            <div className="flex flex-col items-center text-center mb-6 ">
              <div className="flex flex-col items-center gap-2 mb-4 ">
                <h1 className="text-4xl font-bold ">Our Services</h1>
                <div className="border-2 w-[3rem]"></div>
              </div>
              <p className="w-[90%] sm:w-[60%] text-gray-800">Your community, your support. Post your needs in seconds and let nearby volunteers step in - from quick errands to long-term care.</p>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6 justify-items-center sm:justify-items-start">
              <>
                {service_data.slice(0, noofServiceCard).map((service) => (
                  <Service_card
                    key={service.id}
                    title={service.title}
                    icon={service.icon}
                  />
                ))}

                <button
                  onClick={() => {
                    noofServiceCard === 9 ? setServiceCard(3) : setServiceCard(9);
                    setIsServiceCard(!isServiceCard);
                  }}
                  className="sm:hidden mt-4 px-4 py-2 bg-[#052659] text-white rounded-lg hover:bg-[#063d7a]"
                >
                  {!isServiceCard ? <span>See Less</span> : <span>See More</span>}
                </button>
              </>

            </div>
            </div>
      </div>
       
       {/* info */}
      <div className="bg-gradient-to-r from-[#4174b1] to-[#041b3f] text-black sm:min-h-[10rem] flex items-center justify-center px-2 py-6 sm:p-6">
          <div className="w-[100%] lg:w-[90%] xl:w-[80%] grid grid-cols-4 justify-items-center sm:gap-0 gap-2">
            {
                Number_data.map((item,index) => (
                  <Number_cards key={index} title={item.title} Number={item.number} icon={item.icon} />
                ))
            }
          </div>
      </div>

      {/* Review */}
      <div className="bg-[#f5f6f8] text-black min-h-[35rem] flex items-center justify-center sm:p-6 py-10">
          <div className="w-[90%] flex flex-col items-center justify-evenly gap-10 sm:gap-12 ">
            <div className="flex flex-col">
              <div>
                <h1 className="text-2xl sm:text-4xl font-[100] text-center">Read Reviews,</h1>
                <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6">Request with Trust.</h1>
              </div>
              <div className="px-2 flex justify-between  ">
                <span className="flex items-center ">
                  <p className="text-center text-gray-800 text-sm sm:text-[1rem] pr-1">4.5/5</p>
                  <IoIosStar className="text-md text-amber-400 " />
                  <IoIosStar className="text-md text-amber-400 " />
                  <IoIosStar className="text-md text-amber-400 " />
                  <IoIosStar className="text-md text-amber-400 " />
                  <IoIosStarHalf className="text-md text-amber-400 " />                 
                </span>
              <p className="text-center text-gray-800 text-sm md:text-[1rem]">Based on 507 reviews</p>
              </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row justify-between items-center w-full gap-10 mb-5">
              {/* Left Side */}
              <div className="  sm:w-[15%] lg:w-[20%] flex flex-col gap-6">
                <FaQuoteLeft className="text-4xl lg:text-6xl text-[#bbbbbb] hidden md:block" />
                <p className="hidden md:block text-2xl lg:text-4xl font-semibold text-gray-600/90">
                  What our Users are saying
                </p>
                <span className="flex gap-3">
                  <FaArrowLeft
                    onClick={handlePrev}
                    className={`cursor-pointer rounded-full bg-[#bbbbbb]  p-2 w-8 h-8 text-gray-600/90 hover:text-black hover:scale-115 transition-transform duration-300 ease-in-out ${
                      currentPage === 0 ? "opacity-40 cursor-not-allowed" : ""
                    }`}
                  />
                  <FaArrowRight
                    onClick={handleNext}
                    className={`cursor-pointer rounded-full bg-[#bbbbbb] p-2 w-8 h-8 text-gray-600/90 hover:text-black hover:scale-115 transition-transform duration-300 ease-in-out ${
                      endIndex >= Review_data.length ? "opacity-40 cursor-not-allowed" : ""
                    }`}
                  />
                </span>
              </div>
              {/* Right Side (Dynamic Reviews) */}
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentPage}
                      custom={direction}
                      variants={{
                        enter: (direction) => ({
                          opacity: 0,
                          x: direction > 0 ? 80 : -80,
                          scale: 0.98,
                        }),
                        center: {
                          opacity: 1,
                          x: 0,
                          scale: 1,
                          transition: {
                            duration: 0.55,
                            ease: [0.25, 0.1, 0.25, 1],
                          },
                        },
                        exit: (direction) => ({
                          opacity: 0,
                          x: direction > 0 ? -80 : 80,
                          scale: 0.98,
                          transition: {
                            duration: 0.45,
                            ease: [0.25, 0.1, 0.25, 1],
                          },
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.5 }}
                      className="flex justify-between w-full gap-5"
                    >
                      {Review_data.slice(startIndex, endIndex).map((review) => (
                        <ReviewCard
                          key={review.id}
                          text={review.text}
                          profilePic={review.profilePic}
                          name={review.name}
                          time={review.time}
                        />
                      ))}
                    </motion.div>
              </AnimatePresence>
            </div>
          </div>
      </div>
 
      {/* contact */}
      <div id="Contact" className="bg-[#052659] to-85% text-black min-h-[14rem] lg:min-h-[25rem] flex items-center justify-center p-6">
          <div className="w-[80%] grid grid-cols-1 lg:grid-cols-2  justify-items-center gap-6 ">
            <div className="">
              <h1 className="text-4xl lg:text-5xl font-bold text-white ">Contact Us
              </h1>
              <p className="text-white mt-4 text-sm sm:text-base lg:text-md">
                We’d love to hear from you! Whether you have questions, feedback, or suggestions, our team is here to help. Reach out to us anytime, and we’ll make sure to get back to you promptly. Your input helps us improve and serve our community better
              </p>
            </div>
            <div className="hidden lg:block ">
            </div>
          </div>
      </div>
       
       {/* contact info */}
      <div className=" text-black min-h-[25rem] flex py-6 items-center justify-center lg:px-6">
          <div className="w-[80%] sm:w-[90%] md:w-[80%] flex flex-col-reverse sm:flex-row-reverse lg:grid lg:grid-cols-2 justify-items-center gap-2 md:gap-6 ">
            <div className="flex flex-col gap-3 sm:gap-0 lg:gap-4 justify-evenly lg:justify-baseline lg:items-start ">
              <h1 className="text-[1.7rem] font-bold text-[#052659] ">Contact Information
              </h1>
              <p className="text-gray-700 text-sm md:text-base lg:text-md w-[80%] text-left">Feel free to connect with us anytime- we promise a swift and thoughtful response. You can reach us at:
              </p> 
              <div className="flex w-full lg:w-[95%] mt-2">
                {
                  contactItems.map((item) => (
                    <Contact key={item.id} contactInfo={item.contactInfo} tagline={item.tagline} icon={item.icon} />
                  ))
                }
              </div> 
            </div>
            <div className="flex justify-center lg:relative w-full lg:rounded-t-full">
              <div className="hidden lg:absolute lg:block border-[1px] border-white w-[20rem] h-[33rem] rounded-t-full bottom-[0rem] right-[1rem]"></div>
              <img src="src/assets/images/contact.jpg" alt="img" className="lg:absolute lg:bottom-[0rem] lg:right-[1rem] w-[23rem] h-[23rem] sm:w-[20rem] sm:h-[20rem] object-cover lg:w-[20rem] lg:h-[33rem] lg:rounded-t-full p-2 "/>
            </div>
          </div>
      </div>

       {/* feedback  */}
      <div className="bg-white text-black min-h-[20rem] flex items-center justify-center px-6 pb-10">
          <div className="w-[90%] sm:w-[80%] flex flex-col lg:flex-row gap-10 items-center justify-between ">
            <div className="bg-[#5483b3] p-6 rounded-md flex flex-col w-[90%] gap-4 lg:w-[50%] text-white min-h-[30rem] ">
              <p className="font-bold text-2xl">Get In Touch !</p>
              <p className="text-sm mb-4">Have something to say? We’re always excited to hear your thoughts, ideas, or a kind note of appreciation.
              Your feedback fuels our passion and helps us build a stronger connection with you.</p>
                            
              <form action="" className="flex flex-col gap-3 text-gray-300">
                
                <input type="email" name="email" placeholder="Email" className="p-2 rounded-full border outline-0 border-gray-300 hover:border-gray-400"/>
                <input type="text"  name="name" placeholder="Subject" className="p-2 rounded-full border outline-0 border-gray-300 hover:border-gray-400"/>
                <textarea id="message" placeholder="Message" name="message" rows="4" className="p-2 rounded-3xl border border-gray-300  outline-0 hover:border-gray-400"></textarea>
                <button type="submit" className="bg-[#c1e8ff] text-[#052659] font-semibold min-w-[35%] px-4 py-2 rounded-full hover:bg-[#b6dbf0]">Submit</button>
              </form>
            </div>
            <div className="w-[90%] lg:w-[50%] flex flex-col justify-between min-h-[22rem] sm:min-h-[30rem]">
              {/* w-[90%]  */}
              <h2 className="text-2xl font-bold">Our Location</h2>
              <p className="text-gray-600 mb-4">
                Visit us or reach out anytime — here’s where you can find us!
              </p>
              <div className="rounded-xl overflow-hidden shadow-md sm:h-[18rem] ">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.6241692428434!2d80.93727887522445!3d26.915420276645577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39995741b812c187%3A0xdfb2bb8bb85ab00d!2sMAITRI%20GIRLS%20HOSTEL%20IET%20LUCKNOW!5e0!3m2!1sen!2sin!4v1759645233487!5m2!1sen!2sin" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full"></iframe>
                {/* w-[45rem] lg:w-[40rem] h-[18rem] */}
              </div>
              <p className="font-bold text-xl">Social Media</p>
              <div className="flex items-center gap-6 text-2xl text-white ">
                <FaFacebook className="bg-[#052659] w-9 h-8 p-1.5 rounded-t-full"/>
                <FaTwitter className="bg-[#052659] w-9 h-8 p-1.5 rounded-t-full" />
                <FaYoutube className="bg-[#052659] w-9 h-8 p-1.5 rounded-t-full"/>
                <FaLinkedin className="bg-[#052659] w-9 h-8 p-1.5 rounded-t-full"/> 
              </div>
            </div>
          </div>
      </div>
      
      {/* newsletter */}
      <div className="bg-linear-to-r from-[#86b7f3] to-[#032761] min-h-[17rem] sm:min-h-[15rem] md:min-h-[11rem] flex items-center justify-center">
        <div className="w-[95%] sm:w-[80%] grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4 px-6 min-h-[7rem]">
          <div className="flex flex-col text-white gap-2 items-center justify-center md:items-start text-center md:text-left">
            <h1 className="text-lg sm:text-2xl font-bold">Our Newsletters</h1>
            <p className="text-sm  sm:w-[60%]  md:w-[70%]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit facilis, incidunt eius aperiam quos reprehenderit.</p>
          </div>
          <div className="flex flex-col gap-4 items-center text-center justify-end">
            <form action="" className="relative flex sm:min-w-[20rem]">
              <input type="email" name="email" placeholder="Email" className="py-2 text-gray-300 px-4 rounded-full border outline-0 border-gray-300 hover:border-gray-400 w-full"/>
              <button type="submit" className="rounded-full font-semibold py-2 px-4 bg-[#c1e8ff] hover:bg-[#b6dbf0] absolute right-0 border outline-0 border-gray-300" >Submit</button>
            </form>
            <p className="text-white font-semibold">www.abccommunity.help.com</p>
          </div>
        </div>
      </div>
       
       {/* footer */}
      <div className="bg-[#243958] min-h-[25rem] sm:min-h-[20rem] md:min-h-[25rem] flex bg-blend-soft-light items-center justify-evenly p-6 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${Footer})` }}>
          <div className="w-[90%] md:w-[80%] min-h-[25rem] sm:min-h-[20rem] md:min-h-[25rem] flex flex-col items-center justify-between gap-4 pt-10 md:pt-20">
              <div className="flex flex-col sm:flex-row  w-full text-gray-300 gap-10  ">
                <div className="sm:w-[40%] flex flex-col ">
                  <h1 className="text-gray-300 text-2xl font-bold mb-2">ABC Community Help</h1>
                  <p className="text-sm md:text-base lg:text-md w-[80%]">Building a Caring Community, One Connection at a Time</p>

                </div>

                <div className="grid grid-cols-3 gap-6 ">
                  <div className="">
                  <h1 className=" text-lg font-semibold mb-2">Quick Links</h1>
                  <ul className=" text-xs sm:text-sm md:text-base lg:text-md flex flex-col gap-1">
                    <li className="hover:underline cursor-pointer">Home</li>
                    <li className="hover:underline cursor-pointer">About Us</li>
                    <li className="hover:underline cursor-pointer">Services</li>
                    <li className="hover:underline cursor-pointer">Contact</li>
                    <li className="hover:underline cursor-pointer">Blog</li>
                  </ul>
                </div>
                <div className="">
                  <h1 className=" text-lg font-semibold mb-2">Contact Info</h1>
                  <ul className=" text-xs sm:text-sm md:text-base lg:text-md flex flex-col gap-1">
                    <li className="">123 Main St, City, Country</li>
                    <li className="">Email:</li>
                    <li className="">Phone: +123 456 7890</li>
                    <li className="">Fax: +123 456 7891</li>
                  </ul>
                </div>
                <div className="">
                  <h1 className=" text-lg font-semibold mb-2">Follow Us</h1>
                  <ul className=" text-xs sm:text-sm md:text-base lg:text-md flex flex-col gap-1">
                    <li className="hover:underline cursor-pointer">Facebook</li>
                    <li className="hover:underline cursor-pointer">Twitter</li>
                    <li className="hover:underline cursor-pointer">LinkedIn</li>
                    <li className="hover:underline cursor-pointer">Instagram</li>
                  </ul>
                </div> 
                </div>
              </div>
              
              <div className="w-full flex flex-col items-center gap-2 sm:mb-0">
                <hr className="w-full text-gray-300"></hr>
                <p className="text-gray-300 text-xs w-[80%] text-center">© 2024 ABC Community Help. All rights reserved. | Privacy Policy </p>
                <p className="text-gray-300 text-xs w-[80%] text-center">Terms of Service</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Home;