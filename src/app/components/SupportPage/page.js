import React from "react";

const SupportPage = ({ userData }) => {
  return (
    <div className="neo-parent  h-5/6 w-full p-8 flex flex-col gap-2 ">
      <div className="text-5xl w-full mb-4 text-neutral-200 font-semibold antialiased  ">
        Support
      </div>
      <div className="w-full h-full mt-4 ">
        <div className="flex items-center gap-4 h-full w-full">
          <div className="gap-2 flex flex-col p-12 col-span-2 rounded-xl h-full w-full neo-card">
            <div className="w-full text-neutral-300 text-4xl font-bold ">
              Talk to us
            </div>
            <div className="w-full h-full p-8 flex flex-col gap-2 ">
              <div className="w-full h-full flex flex-col">
                <textarea
                  className="h-full neo-card text-3xl font-bold p-8 text-neutral-600 support-input"
                  placeholder="Please tell us your issues"
                />
                <div className="w-full mt-10 h-20 flex flex-row-reverse">
                  <button className="p-2 items-end bg-lime-500 text-black font-bold text-xl rounded-xl px-8 mr-2">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
