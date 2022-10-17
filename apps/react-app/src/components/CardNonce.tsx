import * as React from "react";
import classNames from "classnames";
import { ImpactCardABI } from "@impact-cards/deployments";
import { useContractRead } from "wagmi";

interface CardNonceProps {
  className?: string;
  contractAddress?: string;
}

export const CardNonce = ({ className, contractAddress }: CardNonceProps) => {
  const readRequest = useContractRead({
    addressOrName: contractAddress || "",
    contractInterface: ImpactCardABI,
    functionName: "nonce",
    args: [],
  });

  if (!readRequest?.isSuccess) return null;
  const containerClassName = classNames(className, "CardNonce");
  return (
    <span className={containerClassName}>{readRequest.data?.toString()}</span>
  );
};

export default CardNonce;
