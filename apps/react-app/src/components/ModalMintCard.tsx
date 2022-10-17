import * as React from "react";
import classNames from "classnames";
import { useModal } from "react-modal-hook";
import ModalPanel from "./Modal/ModalPanel";
import FormImpactCardMinterPreviewAndMint from "./FormImpactCardMinterPreviewAndMint";

interface ModalMintCardProps {
  className?: string;
  children?: any;
}

export const ModalMintCard = ({ className, children }: ModalMintCardProps) => {
  const classes = classNames(
    className,
    "ModalHowItWorks cursor-pointer tag tag-cloud"
  );
  const [showModal, hideModal] = useModal(() => (
    <ModalPanel hideModal={hideModal}>
      <FormImpactCardMinterPreviewAndMint />
    </ModalPanel>
  ));

  return (
    <span onClick={showModal} className={classes}>
      {children}
    </span>
  );
};

export default ModalMintCard;
