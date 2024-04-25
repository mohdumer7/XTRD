import Link from "next/link";
import { Spotlight } from "../components/ui/Spotlight";

export default function Error() {
  return (
    <div className="h-full w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className=" p-4 text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Something Went Wrong !
        </h1>
        <p className="mt-8 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          <Link
            href="/"
            className="shadow-[inset_0_0_0_2px_#616467] px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
          >
            Back to Homepage &rarr;
          </Link>
        </p>
      </div>
    </div>
  );
}
