import * as React from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { constants, utils } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { ImpactCardABI } from "@impact-cards/deployments";

interface FormCardTransferProps {
  className?: string;
  contractAddress?: string;
  label?: string;
  defaults?: any;
}

export const FormCardTransfer = ({
  className,
  contractAddress = "0x0000000000000000000000000000000000000000",
  label = "Transfer",
  defaults = {
    amount: "0",
    to: "0x0000000000000000000000000000000000000000",
  },
}: FormCardTransferProps) => {
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
    functionName: "execute",
    args: [watchAll.to, utils.parseEther(watchAll?.amount || "0"), "0x"],
  });

  const txWriteRequest = useContractWrite(config);
  const onSubmit = async (_data: any) => {
    if (txWriteRequest?.write) {
      txWriteRequest.write();
    } else {
      console.error("FormCardTransfer:request.write is undefined");
    }
  };

  const classes = classNames(className, "FormCardTransfer ");
  return (
    <>
      <div className={classes}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="z-0 relative col-span-4"
        >
          <div className="flex flex-col items-center justify-center my-4">
            <div className="flex justify-between w-full mb-4">
              <label className="w-full mr-4">
                <span className="font-bold">Recipient</span>
                <input
                  className="input-lg w-full"
                  placeholder={"To"}
                  {...register("to", { required: true })}
                />
              </label>
              <label className="w-full ml-4">
                <span className="font-bold">Transfer Amount</span>
                <input
                  className="input-lg w-full"
                  placeholder={"Amount"}
                  {...register("amount", { required: true })}
                />
              </label>
            </div>
            <button className="btn btn-emerald btn-lg w-full">
              <span className="">{label}</span> <br />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormCardTransfer;
