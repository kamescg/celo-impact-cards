import * as React from "react";
import classNames from "classnames";
import { useProvider, useSigner } from "wagmi";
import { BigNumber } from "ethers";

interface ButtonAddCeloNetworkProps {
  className?: string;
}

export const ButtonAddCeloNetwork = ({
  className,
}: ButtonAddCeloNetworkProps) => {
  const CELO_MAINNET_PARAMS = {
    chainId: BigNumber.from("42220").toHexString(),
    chainName: "Celo Mainnet",
    nativeCurrency: {
      name: "Celo",
      symbol: "CELO",
      decimals: 18,
    },
    rpcUrls: ["https://forno.celo.org"],
    blockExplorerUrls: ["https://celoscan.io/"],
  };

  const signer = useSigner();

  const onClick = async () => {
    if (signer.data) {
      // @ts-ignore
      signer.data.provider.provider
        .request({
          method: "wallet_addEthereumChain",
          params: [CELO_MAINNET_PARAMS],
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  const containerClassName = classNames(
    className,
    "ButtonAddCeloNetwork btn btn-white"
  );

  return (
    <button onClick={onClick} className={containerClassName}>
      <span className="block py-2">Add Celo Network to Wallet</span>
    </button>
  );
};

export default ButtonAddCeloNetwork;
