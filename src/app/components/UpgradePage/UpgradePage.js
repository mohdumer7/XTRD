import { MdDone } from "react-icons/md";
import { MdOutlineArrowRightAlt } from "react-icons/md";
const UpgradePage = () => {
  return (
    <div className="w-full h-full p-12 ">
      <div className="h-full w-full p-8 rounded-xl flex flex-col gap-2 bg-[#121212] ">
        <div className="text-5xl text-neutral-200 font-semibold antialiased w-full flex ">
          Upgrade Plan
        </div>

        <div className="w-full h-full mt-12 rounded-xl gap-16 flex p-4 neo-parent">
          <div className="neo-card px-12 h-full w-full flex flex-col gap-2 p-8">
            <div className="flex justify-between items-center">
              <p className=" font-bold tracking-wide text-green-400 text-3xl">
                Free
              </p>
              <p className="text-lg text-neutral-800 px-2 bg-neutral-300 h-full flex items-center p-1 rounded-md font-bold">
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
              <p className="text-7xl">0</p>
            </div>
            <div className="w-full h-full flex flex-col gap-2 mt-8">
              <p className="text-lg text-neutral-400 flex items-center gap-3">
                <MdDone className="text-green-400" /> Safe and risk free
              </p>
              <p className="text-lg text-neutral-400 flex items-center gap-3">
                <MdDone className="text-green-400" /> For capital &#60; 1,00,000
              </p>
              <p className="text-lg text-neutral-400 flex items-center gap-3">
                <MdDone className="text-green-400" /> Spot trades only
              </p>
              <p className="text-lg text-neutral-400 flex items-center gap-3">
                <MdDone className="text-green-400" /> Avg ROI per year 15-17 %
              </p>
            </div>
            <button className="w-full bg-green-400 text-neutral-900 font-bold mt-12 mb-12 flex justify-center items-cente text-3xl rounded-full p-2">
              Proceed
            </button>
          </div>
          <div className="neo-card px-12 h-full w-full flex flex-col gap-2 p-8">
            <div className="flex justify-between items-center">
              <p className=" font-bold tracking-wide text-orange-400 text-3xl">
                Premium
              </p>
            </div>
            <div className="w-full py-4">
              <p className="text-lg  text-neutral-600 font-bold">
                For Serious Investments
              </p>
            </div>
            <div className="py-2 flex gap-2">
              <p className="text-3xl">&#8377;</p>
              <p className="text-7xl">2,999</p>
              <p className="self-end ">/ yr</p>
            </div>
            <div className="w-full h-full flex flex-col gap-2 mt-8">
              <p className="text-lg text-neutral-400 flex items-center gap-3">
                <MdDone className="text-green-400" /> Safe and risk free
              </p>
              <p className="text-lg text-neutral-400 flex items-center gap-3">
                <MdDone className="text-green-400" /> For capital &#60; 1,00,000
              </p>
              <p className="text-lg text-neutral-400 flex items-center gap-3">
                <MdDone className="text-green-400" /> Spot trades only
              </p>
              <p className="text-lg text-neutral-400 flex items-center gap-3">
                <MdDone className="text-green-400" /> Avg ROI per year 15-17 %
              </p>
            </div>
            <button className="w-full bg-orange-400 text-neutral-900 font-bold mt-12 mb-12 flex justify-center items-cente text-3xl rounded-full p-2">
              Proceed
            </button>
          </div>
          <div className="neo-card px-12 h-full w-full flex flex-col gap-2 p-8">
            <div className="flex justify-between items-center">
              <p className=" font-bold tracking-wide text-purple-400 text-4xl">
                Elite
              </p>
            </div>
            <div className="w-full py-4">
              <p className="text-lg  text-neutral-600 font-bold">
                For exploration and small investments
              </p>
            </div>
            <div className="py-2 flex gap-2">
              <p className="text-3xl">&#8377;</p>
              <p className="text-7xl">10,000</p>
              <p className="self-end ">/ yr</p>
            </div>
            <div className="w-full h-full flex flex-col gap-2 mt-8">
              <p className="text-lg text-neutral-400 flex items-center gap-3">
                <MdDone className="text-green-400" /> Safe and risk free
              </p>
              <p className="text-lg text-neutral-400 flex items-center gap-3">
                <MdDone className="text-green-400" /> For capital &#60; 1,00,000
              </p>
              <p className="text-lg text-neutral-400 flex items-center gap-3">
                <MdDone className="text-green-400" /> Spot trades only
              </p>
              <p className="text-lg text-neutral-400 flex items-center gap-3">
                <MdDone className="text-green-400" /> Avg ROI per year 15-17 %
              </p>
            </div>
            <button className="w-full bg-purple-400 mt-12 text-neutral-900 font-bold mb-12 flex justify-center items-cente text-3xl rounded-full p-2">
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
