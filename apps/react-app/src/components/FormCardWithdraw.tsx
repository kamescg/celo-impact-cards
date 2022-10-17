import * as React from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { utils } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { ImpactCardABI } from "@impact-cards/deployments";

interface FormCardWithdrawProps {
  className?: string;
  contractAddress?: string;
  defaults?: any;
  symbol?: string;
}

export const FormCardWithdraw = ({
  className,
  contractAddress = "0x0000000000000000000000000000000000000000",
  defaults = {
    amount: "0",
  },
}: FormCardWithdrawProps) => {
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
    functionName: "withdraw",
    args: [utils.parseEther(watchAll?.amount || "0")],
  });

  const txWriteRequest = useContractWrite(config);
  const onSubmit = async (_data: any) => {
    if (txWriteRequest?.write) {
      txWriteRequest.write();
    } else {
      console.error("FormCardWithdraw:request.write is undefined");
    }
  };

  const classes = classNames(className, "FormCardWithdraw ");
  return (
    <>
      <div className={classes}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="z-0 relative col-span-4"
        >
          <div className="flex items-center justify-center my-4">
            <label className="w-full">
              <span className="font-bold">Withdraw Amount</span>
              <input
                className="input-lg w-full"
                placeholder={"Amount"}
                {...register("amount", { required: true })}
              />
            </label>
            <button className="btn btn-emerald btn-lg w-96 ml-4">
              <span className="">Withdraw</span> <br />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormCardWithdraw;
