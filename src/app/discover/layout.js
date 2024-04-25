"use client";

export default function discoverLayout({ children }) {
  return (
    <>
      <section className="h-full w-full text-white flex flex-col justify-center items-center dashboard-bg ">
        <section className="w-full flex h-full">
          {/* Fixed Left Bar */}
          <div className="primary-color-bar pt-5 left-bar w-1/12 h-screen  flex flex-col items-center fixed top-0">
            <img src="/logo.svg" />
            <div className="mt-20 flex flex-col w-full dashboard-text items-start ">
              <p className="sm:text-xs md:text-md lg:text-xl w-full flex justify-center">
                Dashboard
              </p>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="w-full ml-44 overflow-y-auto ml-1/12 min-h-screen">
            {children}
          </div>
        </section>
      </section>
    </>
  );
}
