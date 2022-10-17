import * as React from "react";
import classNames from "classnames";
import Link from "next/link";

interface HowtoGetStartedProps {
  className?: string;
}

export const HowtoGetStarted = ({ className }: HowtoGetStartedProps) => {
  const containerClassName = classNames(className, "HowtoGetStarted");
  return (
    <div className={containerClassName}>
      <section className="text-gray-600 bg-white body-font">
        <div className=" container mx-auto max-w-screen-lg text-center px-20 pt-20">
          <h3 className="font-normal text-6xl text-emerald-500">
            How To Get Started
          </h3>
          <span className="font-normal text-2xl leading-10 mt-4">
            <span className="font-bold text-neutral-500">
              Getting started is easy.
            </span>{" "}
            Get your CELO wallet funded, design and activate your Impact Card.
            Start contributing to public goods.{" "}
            <span className="font-bold text-neutral-500">
              It's that simple.
            </span>
          </span>
        </div>
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full flex justify-center mt-auto mb-auto lg:mb-auto rounded-lg overflow-hidden pb-20 lg:pb-0 lg:p-12">
            <img
              alt="feature"
              className="max-w-lg  w-full"
              src="/img/cards/card-stack-h.png"
            />
          </div>
          <div className="flex flex-col justify-center flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
            <div className="flex mb-10 lg:item-center item-center justify-center">
              <div className="flex-grows">
                <h2 className="text-emerald-700 text-3xl title-font font-medium mb-3">
                  Step 1: Claim 1 CELO
                </h2>
                <p className="leading-relaxed text-xl">
                  Find Celo stewards at DevCon Schelling Point in Bogotá to claim 1 CELO to participate. 
                </p>
                <a
                  href="#claim-celo"
                  className="mt-3 text-blue-500 hover:text-blue-600 inline-flex items-center font-bold"
                >
                  <button className='btn btn-green'>Claim 1 FREE CELO</button>
                </a>
              </div>
            </div>
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="flex-grow">
                <h2 className="text-emerald-700 text-3xl title-font font-medium mb-3">
                  Step 2: Activate Impact Card
                </h2>
                <p className="leading-relaxed text-xl">
                  Design your Impact Card by selecting a color and emoji of your
                  choice. Once you've handcrafted the perfect Impact Card NFT
                  you can mint it on the Celo blockchain.
                </p>
                <Link href='/card'>
                  <button className='btn btn-green'>Activate Card</button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="flex-grow">
                <h2 className="text-emerald-700 text-3xl title-font font-medium mb-3">
                  Step 3: Complete Quests
                </h2>
                <p className="leading-relaxed text-xl">
                As you complete public goods quests, your unique Impact Card will automatically update. Share your Impact Card with friends and family to encourage them to take action for good.
                </p>
                <Link href='/quests'>
                  <button className='btn btn-green'>Celo Quest</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowtoGetStarted;
