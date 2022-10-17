import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import classNames from "classnames";
import { useContractRead } from "wagmi";
import { BigNumber, utils } from "ethers";
import Select from "react-select";

import { useNetworkContract } from "@impact-cards/deployments";

interface FormMintImpactCardProps {
  className?: string;
  defaults?: any;
  symbol?: string;
}

export const FormMintImpactCard = ({ className }: FormMintImpactCardProps) => {
  const ABICoder = new utils.AbiCoder();

  const contract = useNetworkContract("mainnet", "ImpactCard");

  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: {},
  } = useForm({
    defaultValues: {
      pos1: { value: "0", label: "Wolf" },
      pos2: { value: "1", label: "Parrot" },
      pos3: { value: "2", label: "Fox" },
      pos4: { value: "3", label: "Octo" },
    },
  });
  const watchAll = watch();

  const { data, error, isLoading } = useContractRead({
    addressOrName: contract?.address || "",
    contractInterface: contract?.abi || "",
    functionName: "preview",
    args: ["0x00"],
  });
  const onSubmit = async (_data: any) => {
    console.log("writing");
  };

  const classes = classNames(
    className,
    "FormMintImpactCard"
    // "grid grid-cols-12 gap-10"
  );
  const classesLabel = "text-xs font-semibold mb-1 block ";

  return (
    <>
      <div className={classes}>
        <div className="text-center z-5 relative col-span-8">
          <img className="rounded-xl shadow-lg mx-auto w-full" src={data} />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="z-0 relative col-span-4"
        >
          <button className="btn btn-emerald btn-lg mt-3 w-full">
            <span className="">Mint Impact Card</span> <br />
          </button>
        </form>
      </div>
    </>
  );
};

export default FormMintImpactCard;
