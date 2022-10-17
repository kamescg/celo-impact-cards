import * as React from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
} from "wagmi";

import { useNetworkContract } from "@impact-cards/deployments";
import { BigNumber, utils } from "ethers";

interface FormMinterImpactCardPropsMinter {
  className?: string;
  contractAddress?: string;
  defaults?: any;
  symbol?: string;
}

export const FormCardDeposit = ({
  className,
  contractAddress,
}: FormMinterImpactCardPropsMinter) => {
  const contract = useNetworkContract("mainnet", "ImpactCardMinter");

  const {
    register,
    watch,
    handleSubmit,
    formState: {},
  } = useForm({
    defaultValues: {
      amount: "0",
    },
  });
  const watchAll = watch();

  const { config } = usePrepareSendTransaction({
    request: {
      to: contractAddress,
      value: utils.parseEther(watchAll?.amount || "0"),
    },
  });
  const txRequest = useSendTransaction(config);

  // const { data } = useContractRead({
  //   addressOrName: contract?.address,
  //   contractInterface: contract?.abi,
  //   functionName: "preview",
  //   args: ["0x00"],
  // });

  // const account = useAccount();
  // const { config } = usePrepareContractWrite({
  //   addressOrName: contract?.address,
  //   contractInterface: contract?.abi,
  //   functionName: "mint",
  //   args: [account.address],
  // });

  const writing = useContractWrite(config);

  const onSubmit = async (_data: any) => {
    // @ts-ignore
    txRequest.sendTransaction();
  };

  const classes = classNames(className, "FormCardDeposit ");
  return (
    <>
      <div className={classes}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="z-0 relative col-span-4"
        >
          <div className="flex items-center justify-center my-4">
            <input
              className="input-lg rounded-none text-xl placeholder:text-xl"
              placeholder={"Deposit Amount"}
              {...register("amount", { required: true })}
            />
            <button className="btn btn-emerald btn-lg w-96 ml-4">
              <span className="">Deposit</span> <br />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormCardDeposit;
