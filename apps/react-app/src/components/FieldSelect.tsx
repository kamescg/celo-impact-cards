import * as React from "react";
import classNames from "classnames";
import { Controller } from "react-hook-form";
import Select from "react-select";

interface FieldSelectProps {
  className?: string;
  control: any;
  name: string;
  options: any;
}

export const FieldSelect = ({
  className,
  name,
  control,
  options,
}: FieldSelectProps) => {
  const containerClassName = classNames(className, "FieldSelect");
  return (
    <div className={containerClassName}>
      <div className="text-neutral-500">
        {/* {!labelDisable && <label className={classesLabel}>{label}</label>} */}
        <Controller
          name={name || ""}
          control={control}
          render={({ field }) => (
            <Select options={options} defaultValue={options[0]} {...field} />
          )}
        />
      </div>
    </div>
  );
};

export default FieldSelect;
