"use client";

export default function authLayout({ children }) {
  return (
    <>
      <section className="h-screen w-full text-white flex flex-col justify-center items-center dashboard-bg overflow-hidden">
        {children}
      </section>
    </>
  );
}
