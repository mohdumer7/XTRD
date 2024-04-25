import React from "react";
import Faq from "react-faq-component";
const FAQ = ({data}) => {

  return (
    <section className="h-screen pl-44 pr-44 items-center flex flex-col p-2 gap-24">
      <div className="left-side-3 con-3  flex flex-col justify-center gap-4">
        <p className="text-5xl text-white title-3 title-4 ">
          FREQUENTLY ASKED QUESTIONS
        </p>
      </div>
      <div className="con-2 text-2xl flex flex-col w-[67%] ">
        <Faq
          data={data}
          styles={{
            bgColor: "transparent",
            titleTextColor: "#48482a",
            rowTitleColor: "white",
            rowTitleTextSize: "extra-large",
            rowContentColor: "#ffff",
            rowContentTextSize: "16px",
            rowContentPaddingTop: "10px",
            rowContentPaddingBottom: "10px",
            rowContentPaddingLeft: "50px",
            rowContentPaddingRight: "150px",
            arrowColor: "white",
          }}
        />
      </div>
    </section>
  );
};

export default FAQ;
