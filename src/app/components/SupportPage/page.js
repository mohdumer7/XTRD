import React from "react";
import { RiSendPlaneFill } from "react-icons/ri";

const SupportPage = ({ userData }) => {
  return (
    // <div className="neo-parent  h-5/6 w-full p-8 flex flex-col gap-2 ">
    //   <div className="text-5xl w-full mb-4 text-neutral-200 font-semibold antialiased  ">
    //     Support
    //   </div>
    //   <div className="w-full h-full mt-4 ">
    //     <div className="flex items-center gap-4 h-full w-full">
    //       <div className="gap-2 flex flex-col p-12 col-span-2 rounded-xl h-full w-full neo-card">
    //         <div className="w-full text-neutral-300 text-4xl font-bold ">
    //           Talk to us
    //         </div>
    //         <div className="w-full h-full p-8 flex flex-col gap-2 ">
    //           <div className="w-full h-full flex flex-col">
    //             <textarea
    //               className="h-full neo-card text-3xl font-bold p-8 text-neutral-600 support-input"
    //               placeholder="Please tell us your issues"
    //             />
    //             <div className="w-full mt-10 h-20 flex flex-row-reverse">
    //               <button className="p-2 items-end bg-lime-500 text-black font-bold text-xl rounded-xl px-8 mr-2">
    //                 Submit
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="w-full h-full  ">
      <div className="h-full w-full py-[2rem] px-[3rem] rounded-xl flex flex-col  bg-[#121212] ">
        <div className="text-[2rem] w-full text-neutral-200 font-semibold   ">
          Hello, Nihal Lalu
        </div>
        <div className="text-[1.2rem] w-full text-neutral-200 font-semibold   ">
          Support
        </div>

        <div className="flex justify-center  gap-4 w-full h-full">
          <div name="contact" className="w-full h-full flex justify-center text-white">
            <div className="flex flex-col py-4 md:p-4 justify-center max-w-screen-lg w-full h-full">
              <div className="">
                <p className="text-4xl font-bold inline border-b-4 border-gray-500">
                  Get in touch
                </p>
                <p className="py-4">
                  Submit the form below to get in touch with us
                </p>
              </div>

              <div className="flex justify-center items-center ">
                <form
                  // action="https://getform.io/f/7b740eae-e62a-418b-a090-afbdbdd0284a"
                  // method="POST"
                  className="flex flex-col w-full md:w-1/2 gap-2 neo-card px-[2rem] pt-[1.5rem]"
                >
                  <input
                    className="p-2 bg-transparent border-2 border-green-800 rounded-md text-white focus:outline-none"
                    type="text"
                    name="name"
                    placeholder="Enter your name "
                    required
                  />
                  <input
                    className="p-2 bg-transparent border-2 border-green-800 rounded-md text-white focus:outline-none"
                    type="email"
                    name="email"
                    placeholder="Enter your email "
                    required
                  />
                  <textarea
                    className="p-2 bg-transparent border-2 border-green-800 rounded-md text-white focus:outline-none"
                    rows="9"
                    name="message"
                    placeholder="Enter your message"
                    required
                  ></textarea>
                  <button className="group flex gap-1 my-4 py-3 mx-auto px-6 items-center justify-center border-2 cursor-pointer border-white p-2 rounded-md duration-200 hover:border-black hover:bg-white hover:text-black">
                    Let's Talk{" "}
                    <span className="group-hover:rotate-45 duration-300 flex items-center  ">
                      <RiSendPlaneFill />
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
