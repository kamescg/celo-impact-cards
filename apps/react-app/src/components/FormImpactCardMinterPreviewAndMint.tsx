import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import classNames from "classnames";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import Select from "react-select";
import { useNetworkContract } from "@impact-cards/deployments";
import ButtonAddCeloNetwork from "./ButtonAddCeloNetwork";

interface FormMinterImpactCardPropsMinter {
  className?: string;
  defaults?: any;
  symbol?: string;
}

export const FormImpactCardPreviewAndMint = ({
  className,
}: FormMinterImpactCardPropsMinter) => {
  // const contractMainnet = useNetworkContract("mainent", "ImpactCard");
  const contract = useNetworkContract("mainnet", "ImpactCard");

  const {
    watch,
    control,
    handleSubmit,
    setValue,
    formState: {},
  } = useForm({
    defaultValues: {
      style: {
        value: "0",
        label: "🟢 Green",
      },
      emoji: {
        value: "🌱",
        label: "🌱",
      },
    },
  });
  const watchAll = watch();
  const account = useAccount();
  const { data, isError, error } = useContractRead({
    addressOrName: contract?.address,
    contractInterface: contract?.abi,
    functionName: "preview",
    args: [account.address, watchAll?.style?.value, watchAll?.emoji?.value],
  });

  const { config } = usePrepareContractWrite({
    addressOrName: contract?.address,
    contractInterface: contract?.abi,
    functionName: "mint",
    args: [account.address, watchAll?.style?.value, watchAll?.emoji?.value],
  });

  const writing = useContractWrite(config);

  const onSubmit = async (_data: any) => {
    // @ts-ignore
    writing.write();
  };

  const classesLabel =
    "text-sm font-mono font-semibold mb-1 block text-neutral-600";

  const optionsEmoji = [
    { value: "🌱", label: "🌱 " },
    { value: "🛡️", label: "🛡️ " },
    { value: "🍄", label: "🍄 " },
    { value: "🦊", label: "🦊 " },
    { value: "💰", label: "💰 " },
    { value: "🔮", label: "🔮 " },
    { value: "🌞", label: "🌞 " },
    { value: "🌎", label: "🌎 " },
    { value: "🔥", label: "🔥 " },
    { value: "🏆", label: "🏆 " },
    { value: "🚀", label: "🚀 " },
    { value: "🍑", label: "🍑 " },
    { value: "🌟", label: "🌟 " },
    { value: "🐺", label: "🐺 " },
    { value: "🌈", label: "🌈 " },
    { value: "🌍", label: "🌍 " },
    { value: "🦄", label: "🦄 " },
    { value: "🌳", label: "🌳 " },
    { value: "🌊", label: "🌊 " },
  ];

  const optionsColor = [
    { value: "99", label: "Select Color" },
    { value: "0", label: "🟢 Green" },
    { value: "1", label: "🟡 Yellow" },
    { value: "2", label: "🟣 Purple" },
    { value: "3", label: "🔴 Red" },
    { value: "4", label: "⚫ Black" },
    { value: "5", label: "🔵 Blue" },
  ];

  const FieldSelect = ({
    name,
    label,
    options,
    labelDisable,
    className,
  }: any) => {
    return (
      <div className={className}>
        {!labelDisable && <label className={classesLabel}>{label}</label>}
        <Controller
          name={name || ""}
          control={control}
          render={({ field }) => (
            <Select
              options={options}
              className="py-0"
              defaultValue={options[0]}
              {...field}
            />
          )}
        />
      </div>
    );
  };

  const classes = classNames(className, "FormImpactCardPreviewAndMint");
  return (
    <>
      <div className={classes}>
        <div className="text-center z-5 relative">
          <div className="px-10 lg:px-32 mb-10 rounded-xl">
            <img
              className="rounded-xl shadow-lg my-10 mx-auto w-full"
              src={data}
            />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="z-0 relative font-Secondary px-10"
        >
          <FieldSelect
            name="emoji"
            label="Emoji"
            className="mt-6"
            options={optionsEmoji}
            labelDisable={true}
          />

          <FieldSelect
            name="style"
            label="Card Style"
            className="mt-6"
            options={optionsColor}
            labelDisable={true}
          />
          <button className="btn btn-emerald btn-lg mt-3 w-full">
            <span className="font-normal text-xl lg:text-2xl font-Primary">
              Activate Impact Card
            </span>
          </button>
        </form>
        <div className="text-center">
          <ButtonAddCeloNetwork className="btn-white mt-4 mx-auto" />
        </div>
      </div>
    </>
  );
};

export default FormImpactCardPreviewAndMint;
