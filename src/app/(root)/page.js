"use client";
                        
import FAQ from "../components/FAQ";
import EndPage from "../components/Hero/EndPage";
import { heroFaq } from "../constants";

export default function Home() {
  return (
    <>
 
 <section className="h-screen content-1 pl-44 pr-44 flex flex-col items-center justify-center w-full ">
      <div className="flex gap-12 items-center justify-center w-full">
        <div className="w-full flex flex-col content-data gap-8 ">
          <p className="content-title w-full text-7xl ">
            X TRADE: MAKE MONEY WHILE YOU SLEEP
          </p>
          <p className="content-description w-full text-xl">
            X TRADE is an asset/wealth management platform, where with one click
            of a button you make the return on investment of a lifetime.
          </p>
          <div className="flex w-full gap-8">
            <button className="content-filled-button h-16 p-8">
              Get started with X Trade
            </button>
          </div>
        </div>
        <img src="/content/coin.png" className="w-full " />
      </div>
      <img src="/icons/chevron-down.svg" className="h-7" id="scrollIcon" />
    </section>
    <section className="content-2 pl-44 pr-44 h-auto flex flex-col ">
      <p className="text-7xl w-full mt-10 mb-20 content-1-title">
        HOW X TRADE WORKS?
      </p>
      <div className="cards-1 flex justify-between w-3/4 mt-12">
        <div className="w-1/2 flex flex-col  justify-center left-side gap-6">
          <div className="numbered flex items-center gap-3 w-full">
            <p className="cards-sub-heading text-xl flex  justify-center items-center">
              1
            </p>
            <p className="text-xl">Be a X Trader</p>
          </div>
          <div className="text-wrapper w-full flex flex-col gap-4">
            <p className="w-full text-5xl sub-1">SIGN UP !</p>
            <p className=" text-lg w-full text-left sub-2">
              Join the community of X TRADERS and you will on the waitlist for a
              special invitation.
            </p>
          </div>
          <button className="sub-button w-1/4 h-12">Join Now</button>
        </div>

        <div className="img-wrapper-1 w-1/3 flex items-center justify-self-end ">
          <img src="content/coin.png" className="w-full" />
        </div>
      </div>
      <img src="/content/line-1.png" className="w-[15%] self-center" />
      <div className="cards-1  flex justify-between w-3/4 mt-12">
        <div className="img-wrapper w-3/5 flex items-center  ">
          <img src="content/wallet.png" className="w-full" />
        </div>
        <div className="w-max right-side-wrapper flex justify-end">
          <div className="w-1/2 flex flex-col  justify-center left-side gap-6">
            <div className="numbered flex items-center gap-3 w-max">
              <p className="cards-sub-heading text-xl flex  justify-center items-center">
                2
              </p>
              <p className="text-xl tracking-wide">Verify your details</p>
            </div>
            <div className="text-wrapper w-full flex flex-col gap-4">
              <p className="text-5xl  w-full sub-1 whitespace-nowrap">
                LINK YOUR WALLETS
              </p>
              <p className=" text-lg w-[150%] text-left sub-2">
                Choose your favorite broker over 10+ crypto brokers worldwide.
                And connect your wallets for Asset Allocation
              </p>
            </div>
            <button className="sub-button-2 w-3/4 h-12">
              Choose Your Wallet
            </button>
          </div>
        </div>
      </div>
      <img src="/content/line-2.png" className="w-[15%] self-center" />
      <div className="cards-1 sec-3 flex justify-between w-3/4 mt-12">
        <div className="w-1/2 flex flex-col  justify-center left-side gap-6">
          <div className="numbered flex items-center gap-3 w-full">
            <p className="cards-sub-heading text-xl flex  justify-center items-center">
              3
            </p>
            <p className="text-xl">Grab a pillow !</p>
          </div>
          <div className="text-wrapper w-full flex flex-col gap-4">
            <p className="w-full text-5xl sub-1 whitespace-nowrap">
              CAPITAL ALLOCATION
            </p>
            <p className=" text-lg w-full text-left sub-2">
              From analysis to investment, we carefully invest in the market for
              maximum returns, catering to the capital invested.
            </p>
          </div>
          <button className="sub-button-2 w-1/4 h-12">Learn More</button>
        </div>

        <div className="img-wrapper-1 vault w-2/5 flex items-center justify-self-end ">
          <img src="content/vault.png" className="w-full" />
        </div>
      </div>
      <img src="/content/line-3.png" className="w-[15%] self-center sec-3" />
      <div className="cards-1  flex justify-between w-3/4 mt-12">
        <div className="img-wrapper w-3/5 flex items-center  ">
          <img src="content/multiple-coins.png" className="w-full" />
        </div>
        <div className="w-max right-side-wrapper flex justify-end">
          <div className="w-1/2 flex flex-col  justify-center left-side gap-6">
            <div className="numbered flex items-center gap-3 w-max">
              <p className="cards-sub-heading text-xl flex  justify-center items-center">
                4
              </p>
              <p className="text-xl tracking-wide">EAT THE BREAD</p>
            </div>
            <div className="text-wrapper w-full flex flex-col gap-4">
              <p className="text-5xl  w-full sub-1 whitespace-nowrap">
                PROFIT SHARING
              </p>
              <p className=" text-lg w-[150%] text-left sub-2">
                Enjoy your profits by withdrawing through any wallet or directly
                into bank accounts.
              </p>
            </div>
            <button className="sub-button-2 w-3/4 h-12">
              Lets's get started
            </button>
          </div>
        </div>
      </div>
    </section>
    <section className="h-screen pl-44 pr-44 items-center flex mt-20">
      <div className="left-side-3 w-full flex flex-col justify-center gap-4">
        <p className="text-6xl text-white title-3">X TRADE</p>
        <p className="w-[80%] text-lg text-white">
          We research and analyse every move of the market with the best
          experienced traders in the world, considering every impact and
          momentum factors of an entity to maximize profits.
        </p>
      </div>
      <div className="right-side-3 w-3/4">
        <img src="/content/research.png" />
      </div>
    </section>
        <FAQ data={heroFaq || {}}/>
        <EndPage />

    </>
  );
}
