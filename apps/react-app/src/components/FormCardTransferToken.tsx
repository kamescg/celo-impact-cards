import * as React from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { constants, utils } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { ImpactCardABI } from "@impact-cards/deployments";
import FieldSelect from "./FieldSelect";

interface FormCardTransferTokenProps {
  className?: string;
  contractAddress: string;
  label?: string;
  defaults?: any;
  symbol?: string;
}

export const FormCardTransferToken = ({
  className,
  contractAddress = "0x0000000000000000000000000000000000000000",
  label = "Execute",
  defaults = {
    amount: "0",
  },
}: FormCardTransferTokenProps) => {
  const {
    control,
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
    args: [
      constants.AddressZero,
      utils.parseEther(watchAll?.amount || "0"),
      "0x",
    ],
  });

  const txWriteRequest = useContractWrite(config);
  const onSubmit = async (_data: any) => {
    if (txWriteRequest?.write) {
      txWriteRequest.write();
    } else {
      console.error("FormCardTransferToken:request.write is undefined");
    }
  };

  const optionsStyle = [
    { value: "99", label: "Select Color" },
    { value: "0", label: "🟢 Green" },
    { value: "1", label: "🔵 Blue" },
    { value: "2", label: "🔴 Red" },
  ];

  const classes = classNames(className, "FormCardTransferToken ");
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
              placeholder={"Withdraw Amount"}
              {...register("amount", { required: true })}
            />
            <FieldSelect
              name="style"
              label="Card Style"
              className="mt-6"
              control={control}
              options={optionsStyle}
              labelDisable={true}
            />
            <button className="btn btn-emerald btn-lg w-96 ml-4">
              <span className="">{label}</span> <br />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormCardTransferToken;
