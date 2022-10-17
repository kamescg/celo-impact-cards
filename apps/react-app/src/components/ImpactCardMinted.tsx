import * as React from "react";
import classNames from "classnames";
import { useNetworkContract, ImpactCardABI } from "@impact-cards/deployments";
import { useAccount, useContractRead } from "wagmi";
import { Main } from "@/templates/Main";
import { Meta } from "@/templates/Meta";
import { AppConfig } from "@/utils/AppConfig";
import CardRender from "./CardRender";
import BadgeMintSection from "./BadgeMintSection";
import WalletAddress from "./wallet/WalletAddress";
import Balance from "./wallet/Balance";
import { FormCardDeposit } from "./FormCardDeposit";
import FormCardWithdraw from "./FormCardWithdraw";
import FormCardTransferToken from "./FormCardTransferToken";
import FormCardTransfer from "./FormCardTransfer";
import CardNonce from "./CardNonce";
import CardQuestStatus from "./CardQuestStatus";

interface ImpactCardMintedProps {
  className?: string;
  contractAddress?: string;
  tokenId?: string | number;
}

export const ImpactCardMinted = ({
  className,
  contractAddress,
  tokenId = "0",
}: ImpactCardMintedProps) => {
  const contract = useNetworkContract("mainnet", "ImpactCard");

  const account = useAccount();
  // const reading = useContractRead({
  //   addressOrName: contract.address,
  //   contractInterface: contract.abi,
  //   functionName: "tokenOwner",
  //   args: [account],
  // });

  const containerClassName = classNames(className, "ImpactCardMinted");
  return (
    <>
      <Main
        meta={
          <Meta
            title={`${AppConfig.title} | ${AppConfig.description}`}
            description={AppConfig.description}
          />
        }
      >
        <div className="py-10 lg:py-32 px-10 mx-auto bg-gradient-to-br from-green-100 via-green-100 to-green-200 text-center text-neutral-500 shadow-sm dark:from-emerald-700 dark:via-emerald-800 dark:to-emerald-900 dark:text-white">
          <div className="container mx-auto max-w-screen-lg">
            <div className="grid grid-cols-12">
              <div className="col-span-12 lg:col-span-5 order-2 flex justify-center lg:items-center lg:justify-end mt-8">
                <CardRender tokenId={tokenId} />
              </div>
              <div className="col-span-12 lg:col-span-7 text-center lg:text-left lg:pr-20">
                <div className="w-full ">
                  <p className="block text-2xl">welcome</p>
                  <WalletAddress className="block text-5xl" truncate={true} />
                  <div className="mt-4">
                    <div className="flex justify-between items-center font-Secondary">
                      <span className="text-lg font-semibold">
                        impactMarket
                      </span>
                      <CardQuestStatus
                        account={account.address}
                        bytesId="0x0000000000000000000000000000000000000000000000000000000000000011"
                      />
                    </div>
                    <div className="flex justify-between items-center font-Secondary mt-4">
                      <span className="text-lg font-semibold">Ethic Hub</span>
                      <CardQuestStatus
                        account={account.address}
                        bytesId="0x0000000000000000000000000000000000000000000000000000000000000111"
                      />
                    </div>
                    <div className="flex justify-between items-center font-Secondary mt-4">
                      <span className="text-lg font-semibold">
                        Gitcoin Grants
                      </span>
                      <CardQuestStatus
                        account={account.address}
                        bytesId="0x0000000000000000000000000000000000000000000000000000000000000001"
                      />
                    </div>
                  </div>
                  <span className="text-5xl"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default ImpactCardMinted;
