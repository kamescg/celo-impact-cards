import * as React from "react";
import classNames from "classnames";
import { QrReader } from "react-qr-reader";
import ModalPanel from "./Modal/ModalPanel";
import { useModal } from "react-modal-hook";

interface FieldAddressScannerProps {
  className?: string;
  register: any;
}

export const FieldAddressScanner = ({
  className,
  register,
  setValue,
}: FieldAddressScannerProps) => {
  const [data, setData] = React.useState("");

  const [showModal, hideModal] = useModal(() => (
    <ModalPanel hideModal={hideModal}>
      <QrReader
        videoId="videocontainer"
        onResult={(result, error) => {
          console.log(error, "error");
          console.log(result, "result");
          if (!!result) {
            const address = result?.text.split(":")[1].split("@")[0];
            console.log(address, "");
            setData(address);
            setValue("address", address);
            hideModal();
          }

          if (!!error) {
            // console.info(error);
          }
        }}
        style={{ width: "100%" }}
      />
      <div id="videocontainer" className="w-full h-10" />
    </ModalPanel>
  ));

  const containerClassName = classNames(
    className,
    "FieldAddressScanner flex items-center justify-between"
  );
  return (
    <div className={containerClassName}>
      <label className="w-2/3">
        <input
          className="input-lg w-full"
          placeholder={"0x000...000"}
          {...register("address", { required: true })}
          // value={data}
        />
      </label>
      <span
        onClick={showModal}
        className={"btn btn-green btn-lg w-1/3 text-center ml-5"}
      >
        Scan QR
      </span>
    </div>
  );
};

export default FieldAddressScanner;
