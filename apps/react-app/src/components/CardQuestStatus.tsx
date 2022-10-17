import * as React from "react";
import classNames from "classnames";
import { useNetworkContract } from "@impact-cards/deployments";
import { useContractRead } from "wagmi";

interface CardQuestStatusProps {
  className?: string;
  account: string;
  bytesId: string;
}

export const CardQuestStatus = ({
  className,
  account,
  bytesId,
}: CardQuestStatusProps) => {
  const contract = useNetworkContract("mainnet", "ImpactCardOracle");
  const txRead = useContractRead({
    addressOrName: contract.address,
    contractInterface: contract.abi,
    functionName: "status",
    args: [bytesId, account],
  });

  const containerClassName = classNames(className, "CardQuestStatus");
  return (
    <div className={containerClassName}>
      {txRead.data ? "Complete" : "Incomplete"}
    </div>
  );
};

export default CardQuestStatus;
