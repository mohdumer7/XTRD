import React from "react";

export default function DotBackground({ children }) {
  return (
    <div className="h-full w-full  bg-white   bg-dot-black relative">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="h-full relative z-20 p-10 flex flex-col justify-center items-center py-8">
        {children}
      </div>
    </div>
  );
}
