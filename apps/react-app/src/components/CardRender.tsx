import * as React from "react";
import classNames from "classnames";
import { ImpactCardABI, useNetworkContract } from "@impact-cards/deployments";
import { useContractRead } from "wagmi";

interface CardRenderProps {
  className?: string;
  contractAddress?: string;
  tokenId?: string | number;
}

export const CardRender = ({ className, tokenId = 0 }: CardRenderProps) => {
  const contract = useNetworkContract("mainnet", "ImpactCard");

  const txRead = useContractRead({
    addressOrName: contract.address,
    contractInterface: contract.abi,
    functionName: "tokenURI",
    args: [tokenId],
  });

  console.log(txRead, "txRead");

  const [tokenData, setTokenData] = React.useState();
  React.useEffect(() => {
    if (txRead.data) {
      (async () => {
        const json = Buffer.from(
          txRead?.data.substring(29),
          "base64"
        ).toString();
        const result = JSON.parse(json);
        result.traits = {};
        result.attributes.forEach((element: any) => {
          result.traits = {
            ...result.traits,
            [element.trait_type]: element.value,
          };
        });
        setTokenData(result);
      })();
      async () => {};
    }
  }, [txRead.data]);

  console.log(tokenData, "tokenData");

  const containerClassName = classNames(className, "CardRender");
  return (
    <div className={containerClassName}>
      <ImageRender img={tokenData?.image} />
    </div>
  );
};

const ImageRender = ({ img }: any) => {
  if (!img) return null;
  return <img className="rounded-xl shadow-lg mx-auto w-full" src={img} />;
};

export default CardRender;
