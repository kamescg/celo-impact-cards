import * as React from "react";
import classNames from "classnames";
import { Meta } from "@/templates/Meta";
import { AppConfig } from "@/utils/AppConfig";
import { Main } from "@/templates/Main";
import FormImpactCardMinterPreviewAndMint from "./FormImpactCardMinterPreviewAndMint";
import HowToGetFunded from "./HowToGetFunded";
import { IsWalletConnected } from "@/components/wallet/IsWalletConnected";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface ImpactCardNotMintedProps {
  className?: string;
}

export const ImpactCardNotMinted = ({
  className,
}: ImpactCardNotMintedProps) => {
  const containerClassName = classNames(className, "ImpactCardNotMinted");
  return (
    <Main
      meta={
        <Meta
          title={`${AppConfig.title} | ${AppConfig.description}`}
          description={AppConfig.description}
        />
      }
    >
      <section className="bg-emerald-100 bg-gradient-to-b from-white to-neutral-100 py-10 pb-20">
        <div className="container mx-auto max-w-screen-md">
          <h3 className="text-center text-3xl lg:text-6xl text-neutral-700">
            Design &amp; Activate
          </h3>
          <IsWalletConnected loading={<Loading />}>
            <FormImpactCardMinterPreviewAndMint />
          </IsWalletConnected>
        </div>
      </section>
      <HowToGetFunded />
    </Main>
  );
};

const Loading = (props) => {
  return (
    <div className="text-center container block w-full">
      <span className="inline-block">
        <ConnectButton
          chainStatus={"icon"}
          showBalance={false}
          accountStatus={{ smallScreen: "avatar", largeScreen: "avatar" }}
        />
      </span>
    </div>
  );
};

export default ImpactCardNotMinted;
