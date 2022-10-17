import * as React from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

import { useNetworkContract } from "@impact-cards/deployments";

interface FormMinterImpactCardPropsMinter {
  className?: string;
  defaults?: any;
  symbol?: string;
}

export const FormMintImpactCardMinter = ({
  className,
}: FormMinterImpactCardPropsMinter) => {
  const contract = useNetworkContract("mainnet", "ImpactCardMinter");

  const {
    watch,
    handleSubmit,
    formState: {},
  } = useForm({
    defaultValues: {},
  });
  // const watchAll = watch();

  const { data } = useContractRead({
    addressOrName: contract?.address,
    contractInterface: contract?.abi,
    functionName: "preview",
    args: ["0x00"],
  });

  const account = useAccount();
  const { config } = usePrepareContractWrite({
    addressOrName: contract?.address,
    contractInterface: contract?.abi,
    functionName: "mint",
    args: [account.address],
  });

  const writing = useContractWrite(config);

  const onSubmit = async (_data: any) => {
    // @ts-ignore
    writing.write();
  };

  const classes = classNames(className, "FormMintImpactCardMinter ");
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

export default FormMintImpactCardMinter;
