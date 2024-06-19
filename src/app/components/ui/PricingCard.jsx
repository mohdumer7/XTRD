import React from 'react';
import { MdDone } from 'react-icons/md';
import { toast } from 'react-toastify';

const PricingCard = ({
  planName,
  isCurrentPlan,
  description,
  price,
  currency,
  bgColor,
  points,
  buttonBg,
  isDisabled,
  onProceed
}) => {
  return (
    <div className="pricing-card h-[70vh] w-[22vw]">
      <div className="neo-card p-[2rem] w-full flex flex-col gap-2 h-full">
        <div className="flex justify-between items-center">
          <p className={`font-bold tracking-wide text-3xl ${bgColor}`}>
            {planName}
          </p>
          {isCurrentPlan && (
            <p className="text-lg text-neutral-800 px-2 bg-neutral-300 flex items-center p-1 rounded-md font-bold">
              Current Plan
            </p>
          )}
        </div>
        <div className="w-full py-4">
          <p className="text-lg text-neutral-600 font-bold">{description}</p>
        </div>
        <div className="py-2 flex gap-2">
          <p className="text-3xl">{currency}</p>
          <p className="text-4xl">{price} /<span className='text-lg'>month</span></p>
        </div>
        <div className="w-full flex flex-col gap-2 mt-8">
          {points.map((point, index) => (
            <p key={index} className="text-lg text-neutral-400 flex items-center gap-3">
              <MdDone className={`${bgColor}`} /> {point}
            </p>
          ))}
        </div>
        <div className="h-full flex items-center">
          <button
            className={`w-full ${buttonBg} justify-self-end text-neutral-900 font-bold flex justify-center items-center text-3xl rounded-full p-2`}
            disabled={isDisabled}
            onClick={onProceed}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
