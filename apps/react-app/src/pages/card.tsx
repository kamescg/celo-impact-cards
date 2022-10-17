// @ts-ignore
import { useAccount, useContractRead } from "wagmi";

import { useNetworkContract } from "@impact-cards/deployments";
import ImpactCardMinted from "@/components/ImpactCardMinted";
import ImpactCardNotMinted from "@/components/ImpactCardNotMinted";
import ModalMintCard from "@/components/ModalMintCard";
import { Meta } from "@/templates/Meta";
import { Main } from "@/templates/Main";
import { AppConfig } from "@/utils/AppConfig";

const Wrapper = (props) => {
  const account = useAccount();
  const contract = useNetworkContract("mainnet", "ImpactCard");
  const reading = useContractRead({
    addressOrName: contract.address,
    contractInterface: contract.abi,
    functionName: "balanceOf",
    args: [account.address],
  });

  const tokenOwner = useContractRead({
    addressOrName: contract.address,
    contractInterface: contract.abi,
    functionName: "tokenOwner",
    args: [account.address],
  });

  if (account.address === undefined) return <ImpactCardNotMinted />;

  if (!tokenOwner.isSuccess) return null;
  if (!reading?.isSuccess) return <ImpactCardNotMinted />;
  if (reading?.isSuccess) {
    if (reading?.data?.toString() === "0") {
      return <ImpactCardNotMinted />;
    } else {
      return (
        <div className="">
          <ImpactCardMinted tokenId={tokenOwner.data} />
        </div>
      );
    }
  }
};

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title={`${AppConfig.title} | ${AppConfig.description}`}
          description={AppConfig.description}
        />
      }
    >
      <div className="">
        <div className="dark: mx-auto bg-gradient-to-br from-green-100 via-green-100 to-green-200 py-20 text-center text-neutral-700 shadow-sm dark:from-emerald-700 dark:via-emerald-800 dark:to-emerald-900 dark:text-white">
          <div className="container mx-auto max-w-screen-lg">
            <h3 className="font-normal text-2xl mb-0 leading-3">
              A Card that represents Your Impact
            </h3>
            <h3 className="font-normal text-5xl leading-0">
              Every Transaction Makes A Difference
            </h3>
            <img
              className="inline-block mx-auto my-10"
              src="/img/mockup/climate-cards.png"
            />
            <div className=" w-1/2 text-center mx-auto">
              <ModalMintCard>
                <button className="btn btn-lg btn-emerald my-10 text-3xl">
                  <span className="text-3xl">Activate Celo Impact Card</span>
                </button>
              </ModalMintCard>
              <p className=" mx-auto leading-relaxed text-base">
                Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
                gentrify, subway tile poke farm-to-table. Franzen you probably
                haven't heard of them man bun deep jianbing.
              </p>
            </div>
          </div>
        </div>
        <section className="text-gray-600 body-font bg-white">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h2 className="text-xl text-emerald-500 tracking-widest font-medium title-font mb-1">
                GET INVOLVED
              </h2>
              <h1 className="sm:text-3xl md:text-6xl text-2xl font-medium title-font mb-4 text-gray-900">
                Make an Impact
              </h1>
              <p className="lg:w-1/2 mx-auto leading-relaxed text-base">
                Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
                gentrify, subway tile poke farm-to-table. Franzen you probably
                haven't heard of them man bun deep jianbing.
              </p>
            </div>
            <div className="flex flex-wrap">
              <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                <h2 className="text-lg sm:text-2xl text-gray-900 font-medium title-font mb-2">
                  Environmental
                </h2>
                <p className="leading-relaxed text-base mb-4">
                  Fingerstache flexitarian street art 8-bit waistcoat.
                  Distillery hexagon disrupt edison bulbche.
                </p>
              </div>
              <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                <h2 className="text-lg sm:text-2xl text-gray-900 font-medium title-font mb-2">
                  Social
                </h2>
                <p className="leading-relaxed text-base mb-4">
                  Fingerstache flexitarian street art 8-bit waistcoat.
                  Distillery hexagon disrupt edison bulbche.
                </p>
              </div>
              <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                <h2 className="text-lg sm:text-2xl text-gray-900 font-medium title-font mb-2">
                  Regenerative
                </h2>
                <p className="leading-relaxed text-base mb-4">
                  Fingerstache flexitarian street art 8-bit waistcoat.
                  Distillery hexagon disrupt edison bulbche.
                </p>
              </div>
              <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                <h2 className="text-lg sm:text-2xl text-gray-900 font-medium title-font mb-2">
                  Finance
                </h2>
                <p className="leading-relaxed text-base mb-4">
                  Fingerstache flexitarian street art 8-bit waistcoat.
                  Distillery hexagon disrupt edison bulbche.
                </p>
              </div>
            </div>
            <div className="text-center mt-20">
              <button className="btn btn-lg btn-emerald">
                <span className="text-3xl font-light px-10">
                  Join the Celo Impact Network
                </span>
              </button>
              <div />
              <img src="/img/glyph.png" className="w-20 inline-block mt-12" />
            </div>
          </div>
        </section>
      </div>
    </Main>
  );
};

export default Wrapper;
