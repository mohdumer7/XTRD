import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PricingCard from '../ui/PricingCard';
import ConfirmationModal from '../ui/ConfirmationModal';
import { useConfirmationModal } from '@/app/hooks/useConfirmationModal';

const PricingPlans = ({ user }) => {
  const apiUrl = process.env.currentEnv === "LOCAL" ? process.env.LOCAL : process.env.PROD;
  const [currentPlan, setCurrentPlan] = useState(user.userPlan);
  const [plans, setPlans] = useState([
    { name: 'Free', price: 0, currency: '₹', bgColor: 'text-green-400', points: ['Safe and risk free', 'For capital < 1,00,000', 'Spot trades only', 'Avg ROI per year 15-17 %'], buttonBg: 'bg-green-400', isDisabled: false, isCurrentPlan: false },
    { name: 'Premium', price: 100, currency: '₹', bgColor: 'text-blue-400', points: ['All Free features', 'For capital < 5,00,000', 'Advanced analytics', 'Priority support'], buttonBg: 'bg-blue-400', isDisabled: false, isCurrentPlan: false },
    { name: 'Elite', price: 200, currency: '₹', bgColor: 'text-red-400', points: ['All Premium features', 'For capital < 10,00,000', 'Dedicated account manager', 'Exclusive insights'], buttonBg: 'bg-red-400', isDisabled: false, isCurrentPlan: false },
  ]);
  const [planPrices,setPlanPrices] = useState({})
  const { isOpen, openModal, closeModal, handleConfirm, modalProps } = useConfirmationModal();

  useEffect(()=>{
    const planPricesMap = plans.reduce((acc, plan) => {
      acc[plan.name] = plan.price;
      return acc;
    }, {});
    setPlanPrices(planPricesMap)
  },[plans])

  useEffect(() => {
    const updatedPlans = plans.map(plan => {
      if (plan.name === currentPlan) {
        return { ...plan, isCurrentPlan: true, isDisabled: true };
      } else if (currentPlan === 'Premium' && plan.name === 'Free') {
        return { ...plan, isDisabled: true, isCurrentPlan: false };
      } else if (currentPlan === 'Elite' && (plan.name === 'Free' || plan.name === 'Premium')) {
        return { ...plan, isDisabled: true, isCurrentPlan: false };
      } else {
        return { ...plan, isDisabled: false, isCurrentPlan: false };
      }
    });
    setPlans(updatedPlans);
  }, [currentPlan]);

  const handleCancel = (planName, price) => {
    openModal({
      title: `Confirm ${planName} Plan Cancellation?`,
      description: `Are you sure you want to Cancel your ${planName} plan?`,
      cautionNote: 'a refund of 50% of the plan cost will be iniated for this month',
      showConfirmCheckbox: true,
      onConfirm: () => {
        handleProceed(planName, price,"cancelPlan")
      },
    });
  };

  const handleUpgrade = (planName, price)=>{
    openModal({
      title: `Upgrade to ${planName} Plan`,
      description: `Are you sure you want to Upgrade to ${planName} plan, You will be charged ${planPrices[planName]} every month?`,
      cautionNote: 'Upon cancellation of the plan a refund of 50% for the month will initiated and subscription will be stopped',
      showConfirmCheckbox: true,
      onConfirm: () => {
        handleProceed(planName, price,"upgradePlan")
      },
    });
  }

  const handleProceed = async (planName, price,action) => {
    const planOrder = plans.map(plan => plan.name);
    

    try {
      const response = await fetch(`${apiUrl}/api/purchase-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          selectedPlan: planName,
          price,
          action,
          planOrder,
          planPrices
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success(data.message);
        if(action === "cancelPlan"){
          setCurrentPlan("Free")
        }else{
          setCurrentPlan(planName);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating plan:", error);
      toast.error("Internal server error");
    }
  };

  return (
    <>
     <div className='w-full flex justify-between items-center'>
      <h1 className="text-4xl font-bold text-white pl-10 my-6 items-self-start w-full">Upgrade Your Plan</h1>
      <button  disabled={currentPlan === "Free"} className={`w-48 h-12 text-2xl ${currentPlan === "Free"?"bg-gray-400":"bg-red-600"}`} onClick={()=>{handleCancel(currentPlan,"N/A")}} >Cancel Plan</button>
      </div>

    <div className="flex flex-wrap gap-8">
      {plans.map((plan, index) => (
        <PricingCard
          key={index}
          planName={plan.name}
          isCurrentPlan={plan.isCurrentPlan}
          description={`For exploration and small investments`}
          price={plan.price}
          currency={plan.currency}
          bgColor={plan.bgColor}
          points={plan.points}
          buttonBg={plan.isDisabled ? 'bg-gray-400' : plan.buttonBg}
          isDisabled={plan.isDisabled}
          onProceed={() => handleUpgrade(plan.name, plan.price)}
        />
      ))}
    </div>
    <ConfirmationModal
        isOpen={isOpen}
        title={modalProps.title}
        description={modalProps.description}
        onConfirm={handleConfirm}
        onCancel={closeModal}
        cautionNote={modalProps.cautionNote}
        showConfirmCheckbox={modalProps.showConfirmCheckbox}
      />
    </>
  );
};

export default PricingPlans;
