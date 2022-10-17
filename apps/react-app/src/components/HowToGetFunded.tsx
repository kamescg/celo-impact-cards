import * as React from "react";
import classNames from "classnames";
import ModalMintCard from "./ModalMintCard";

interface HowToGetFundedProps {
  className?: string;
}

export const HowToGetFunded = ({ className }: HowToGetFundedProps) => {
  const containerClassName = classNames(className, "HowToGetFunded");
  return (
    <div id="claim-celo" className={containerClassName}>
      <section className="text-emerald-600 body-font bg-neutral-50 px-10">
        <div className="container mx-auto text-center max-w-screen-lg py-10">
          <h3 className="font-normal text-3xl lg:text-5xl text-emerald-600?">
            Join Celo’s Community
          </h3>
          <div className="my-4" />
          <p className="text-xl text-emerald-600">
              Find Celo stewards at DevCon Schelling Point in Bogotá to claim 1 CELO to participate.
          </p>
        </div>

        <div className="container px-5 py- mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-emerald-600">
                  <img alt="content" className=" w-full" src="/img/glyph.png" />
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font text-2xl mt-4 text-emerald-700 text-lg">
                    Start your Impact Journey
                  </h2>s
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <h2 className="font-medium title-font text-2xl mt-4 text-emerald-700 text-2xl">
                  Start your Regenerative Finance Journey
                </h2>
                <span className="font-normal text-3xl my-5 block lg:text-6xl">
                  <span className="text-emerald-600">Find us at DevCon</span>
                </span>
                <p className="leading-relaxed text-lg text-neutral-600 mb-4">
                  We see a world where creators and founders reshape local
                  economies. We want growth of local economies to regenerate
                  global ecologies. We build products that create the conditions
                  for prosperity — for everyone.{" "}
                  <span className="font-bold">We are Celo.</span>
                </p>
                {/* <p className="leading-relaxed text-lg text-neutral-600 mb-4">
                  Join a growing network of people who are using Celo to
                  regenerate the planet and create a more equitable world.
                </p> */}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="body-font overflow-hidden">
          <div className="container max-w-screen-md mx-auto">
            <ModalMintCard className="w-full">
              <button className="btn btn-lg btn-emerald my-3 w-full lg:my-10">
                Activate Impact Card
              </button>
            </ModalMintCard>
          </div>
        </div> */}
      </section>
      <section className="body-font overflow-hidden px-10 lg:px-40">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-12">
            <div className="p-12 md:w-1/2 flex flex-col items-start">
              <span className="inline-block py-1 px-2 rounded bg-emerald-50 text-emerald-500 text-normal font-medium tracking-widest">
                In Real Life (IRL)
              </span>
              <h2 className="sm:text-3xl text-2xl title-font text-2xl font-medium text-emerald-900 mt-4 mb-4">
                Thursday 10th, 1:00pm - 1:30pm
              </h2>
              <p className="leading-relaxed text-xl mb-8">
                Find Celo at DevCon at the SCRF Community Booth.
              </p>
              <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-emerald-200 mt-auto w-full" />
              <a className="inline-flex items-center">
                <img
                  alt="Nikhil Raghuveera"
                  src="https://pbs.twimg.com/profile_images/1567553945354096640/Ljaz98AG_400x400.jpg"
                  className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                />
                <span className="flex-grow flex flex-col pl-4">
                  <span className="title-font text-2xl font-medium text-emerald-900">
                    Mashiat Mutmainnah
                  </span>
                  <span className="text-emerald-600 text-lg tracking-widest mt-0.5">
                    Celo NFT Ecosystem Lead
                  </span>
                </span>
              </a>
              <button className="btn btn-lg btn-white mt-10 w-full">
                🍾 Find us in real life and we'll hook it up 🎉
              </button>
            </div>
            <div className="p-12 lg:px-20 md:w-1/2 flex flex-col items-start">
              <img
                className="w-64 mx-auto"
                src="/img/qr-funding.png"
              />
              <a
                className="w-full"
                target={"_blank"}
                href="https://discord.com/invite/6yWMkgM"
              >
                <button className="btn btn-lg btn-emerald mt-10 w-full ml-auto">
                  Scan the QR Code to request 1 FREE CELO Request Form.
                </button>
              </a>
              {/* <p className="text-center text-xl w-2/3 mx-auto">
                Every <span className="font-bold">1 hour</span> Celo faucet
                requests will be processed.
              </p> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowToGetFunded;
