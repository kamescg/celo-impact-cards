import * as React from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { utils } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { ImpactCardABI } from "@impact-cards/deployments";
import FieldAddressScanner from "./FieldAddressScanner";
import { useNetworkContract } from "@impact-cards/deployments";
interface FormOracleGitcoinPropsAccountStatusEnable {
  className?: string;
  contractAddress?: string;
  defaults?: any;
  symbol?: string;
}

export const FormOracleGitcoinAccountStatusEnable = ({
  className,
  defaults = {
    address: undefined,
  },
}: FormOracleGitcoinPropsAccountStatusEnable) => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: {},
  } = useForm({
    defaultValues: defaults,
  });
  const watchAll = watch();

  const contract = useNetworkContract("mainnet", "ImpactCardOracle");
  const { config } = usePrepareContractWrite({
    addressOrName: contract.address,
    contractInterface: contract.abi,
    functionName: "enableGitcoinDonated",
    args: [watchAll.address],
  });

  const txWriteRequest = useContractWrite(config);
  const onSubmit = async (_data: any) => {
    if (txWriteRequest?.write) {
      txWriteRequest.write();
    } else {
      console.error(
        "FormOracleGitcoinAccountStatusEnable:request.write is undefined"
      );
    }
  };

  const classes = classNames(
    className,
    "FormOracleGitcoinAccountStatusEnable "
  );
  return (
    <>
      <div className={classes}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="z-0 relative col-span-4"
        >
          <div className="flex flex-col  my-4">
            <FieldAddressScanner
              register={register}
              setValue={setValue}
              className="mb-10"
            />
            <button className="btn btn-emerald btn-lg w-full">
              <span className="">Update</span> <br />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormOracleGitcoinAccountStatusEnable;
