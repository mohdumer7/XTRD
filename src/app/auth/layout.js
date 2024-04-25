"use client";

import { GridSmallBackground } from "../components/ui/backgroundGrid";

export default function authLayout({ children }) {
  return (
    <>
      <section className="h-full w-full text-white flex flex-col justify-center items-center dashboard-bg overflow-hidden">
        <GridSmallBackground>
          <section className="w-full flex h-full">
            {/* Scrollable Content */}
            <div className="w-full flex justify-center items-center  ml-1/12 h-screen">
              {children}
            </div>
          </section>
        </GridSmallBackground>
      </section>
    </>
  );
}
