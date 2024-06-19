import React from 'react';
import PricingPlans from './PricingPlans';

const UpgradePage = ({ userData }) => {
  return (
    <div className="w-full flex flex-col items-center bg-[#121212]">
     
      <PricingPlans user={userData}/>
    </div>
  );
};

export default UpgradePage;
