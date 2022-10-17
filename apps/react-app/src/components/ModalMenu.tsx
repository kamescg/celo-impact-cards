import * as React from "react";
import classNames from "classnames";
import "@rainbow-me/rainbowkit/styles.css";
import { useModal } from "react-modal-hook";
import { ModalFullScreen } from "./Modal/ModalFullScreen";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface ModalMenuProps {
  className?: string;
  children?: any;
}

export const ModalMenu = ({ className, children }: ModalMenuProps) => {
  const classes = classNames(
    className,
    "ModalHowItWorks cursor-pointer tag tag-cloud"
  );
  const [showModal, hideModal] = useModal(() => (
    <ModalFullScreen hideModal={hideModal}>
      <Link href="/quests">
        <button className="btn btn-s btn-emerald text-lg cursor-pointer mx-0 w-full text-center">
          <span className="flex item-center justify-center py-3">
            <span className="">
              <img
                src="/img/glyph-reverse.png"
                alt=""
                className="w-4 inline-block"
              />
            </span>
            <span className="ml-3 mr-1  font-Primary  font-bold">
              Celo Quests
            </span>
          </span>
        </button>
      </Link>
      <Link href="/card">
        <button className="btn btn-s btn-purple text-lg cursor-pointer mt-4 w-full text-center">
          <span className="ml-3 font-Primary font-bold">Impact Card</span>
        </button>
      </Link>
      <Link href="/how-it-works">
        <button className="btn btn-s btn-blue text-lg cursor-pointer mt-4 w-full text-center">
          <span className="ml-3 font-Primary font-bold">How It Works</span>
        </button>
      </Link>
      <div className="my-8" />
      <h3 className="font-normal text-lg text-center">Integrations</h3>
      <ul className="mt-4 list-disc pl-2">
        <li className="py-1">
          <Link href="/integration/ethic-hub">
            <a className="text-xl text-neutral-600 cursor-pointer">Ethic Hub</a>
          </Link>
        </li>
        <li className="py-1">
          <Link href="/integration/impact-market">
            <a className="text-xl text-neutral-600 cursor-pointer">
              impactMarket
            </a>
          </Link>
        </li>
        <li className="py-1">
          <Link href="/integration/Gitcoin">
            <a className="text-xl text-neutral-600 cursor-pointer">Gitcoin</a>
          </Link>
        </li>
      </ul>
    </ModalFullScreen>
  ));

  return (
    <span onClick={showModal} className={classes}>
      <button className="btn btn-green">Menu</button>
    </span>
  );
};

export default ModalMenu;
