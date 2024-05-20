import { MdDone } from "react-icons/md";
import { MdOutlineArrowRightAlt } from "react-icons/md";
const UpgradePage = () => {
  return (
    <div className="w-full h-full  ">
      <div className="h-full w-full py-[2rem] px-[3rem] rounded-xl flex flex-col gap-2 bg-[#121212] ">
        <div className="text-[2rem] w-full text-neutral-200 font-semibold antialiased  ">
          Hello, Nihal Lalu
        </div>
        <div className="text-[1.2rem] w-full text-neutral-200 font-semibold antialiased  ">
          Upgrad plans
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 mt-[2rem] md:px-3 gap-4 h-full">
          <div className="">
            <div className="neo-card p-[2rem] w-full flex flex-col gap-2 h-full ">
              <div className="flex justify-between items-center">
                <p className=" font-bold tracking-wide text-green-400 text-3xl">
                  Free
                </p>
                <p className="text-lg text-neutral-800 px-2 bg-neutral-300  flex items-center p-1 rounded-md font-bold">
                  {" "}
                  Current Plan
                </p>
              </div>
              <div className="w-full py-4">
                <p className="text-lg  text-neutral-600 font-bold">
                  For exploration and small investments
                </p>
              </div>
              <div className="py-2 flex gap-2">
                <p className="text-3xl">&#8377;</p>
                <p className="text-4xl">0</p>
              </div>
              <div className="w-full  flex flex-col gap-2 mt-8">
                <p className="text-lg text-neutral-400 flex items-center gap-3">
                  <MdDone className="text-green-400" /> Safe and risk free
                </p>
                <p className="text-lg text-neutral-400 flex items-center gap-3">
                  <MdDone className="text-green-400" /> For capital &#60;
                  1,00,000
                </p>
                <p className="text-lg text-neutral-400 flex items-center gap-3">
                  <MdDone className="text-green-400" /> Spot trades only
                </p>
                <p className="text-lg text-neutral-400 flex items-center gap-3">
                  <MdDone className="text-green-400" /> Avg ROI per year 15-17 %
                </p>
                <button className="w-full bg-green-400 text-neutral-900 font-bold flex justify-center items-cente text-3xl rounded-full p-2">
                  Proceed
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <div className="neo-card p-[2rem] w-full flex flex-col gap-2 h-full ">
              <div className="flex justify-between items-center">
                <p className=" font-bold tracking-wide text-green-400 text-3xl">
                  Free
                </p>
                <p className="text-lg text-neutral-800 px-2 bg-neutral-300  flex items-center p-1 rounded-md font-bold">
                  {" "}
                  Current Plan
                </p>
              </div>
              <div className="w-full py-4">
                <p className="text-lg  text-neutral-600 font-bold">
                  For exploration and small investments
                </p>
              </div>
              <div className="py-2 flex gap-2">
                <p className="text-3xl">&#8377;</p>
                <p className="text-4xl">0</p>
              </div>
              <div className="w-full  flex flex-col gap-2 mt-8">
                <p className="text-lg text-neutral-400 flex items-center gap-3">
                  <MdDone className="text-green-400" /> Safe and risk free
                </p>
                <p className="text-lg text-neutral-400 flex items-center gap-3">
                  <MdDone className="text-green-400" /> For capital &#60;
                  1,00,000
                </p>
                <p className="text-lg text-neutral-400 flex items-center gap-3">
                  <MdDone className="text-green-400" /> Spot trades only
                </p>
                <p className="text-lg text-neutral-400 flex items-center gap-3">
                  <MdDone className="text-green-400" /> Avg ROI per year 15-17 %
                </p>
                <button className="w-full bg-green-400 text-neutral-900 font-bold flex justify-center items-cente text-3xl rounded-full p-2">
                  Proceed
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <div className="neo-card p-[2rem] w-full flex flex-col gap-2 h-full ">
              <div className="flex justify-between items-center">
                <p className=" font-bold tracking-wide text-green-400 text-3xl">
                  Free
                </p>
                <p className="text-lg text-neutral-800 px-2 bg-neutral-300  flex items-center p-1 rounded-md font-bold">
                  {" "}
                  Current Plan
                </p>
              </div>
              <div className="w-full py-4">
                <p className="text-lg  text-neutral-600 font-bold">
                  For exploration and small investments
                </p>
              </div>
              <div className="py-2 flex gap-2">
                <p className="text-3xl">&#8377;</p>
                <p className="text-4xl">0</p>
              </div>
              <div className="w-full  flex flex-col gap-2 mt-8">
                <p className="text-lg text-neutral-400 flex items-center gap-3">
                  <MdDone className="text-green-400" /> Safe and risk free
                </p>
                <p className="text-lg text-neutral-400 flex items-center gap-3">
                  <MdDone className="text-green-400" /> For capital &#60;
                  1,00,000
                </p>
                <p className="text-lg text-neutral-400 flex items-center gap-3">
                  <MdDone className="text-green-400" /> Spot trades only
                </p>
                <p className="text-lg text-neutral-400 flex items-center gap-3">
                  <MdDone className="text-green-400" /> Avg ROI per year 15-17 %
                </p>
                <button className="w-full bg-green-400 text-neutral-900 font-bold flex justify-center items-cente text-3xl rounded-full p-2">
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
