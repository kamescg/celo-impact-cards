import * as React from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { utils } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { ImpactCardABI } from "@impact-cards/deployments";

interface FormCardDepositProps {
  className?: string;
  contractAddress?: string;
  defaults?: any;
  symbol?: string;
}

export const FormCardDeposit = ({
  className,
  contractAddress = "0x0000000000000000000000000000000000000000",
  defaults = {
    amount: "0",
  },
}: FormCardDepositProps) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: {},
  } = useForm({
    defaultValues: defaults,
  });
  const watchAll = watch();
  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: ImpactCardABI,
    functionName: "deposit",
    overrides: {
      value: utils.parseEther(watchAll?.amount || "0"),
    },
  });

  const txWriteRequest = useContractWrite(config);
  const onSubmit = async (_data: any) => {
    if (txWriteRequest?.write) {
      txWriteRequest.write();
    } else {
      console.error("FormCardDeposit:request.write is undefined");
    }
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
            <label className="w-full">
              <span className="font-bold">Deposit Amount</span>
              <input
                className="input-lg w-full"
                placeholder={"Amount"}
                {...register("amount", { required: true })}
              />
            </label>
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
