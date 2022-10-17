import type { ReactNode } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AppColorMode } from "@/components/App/AppColorMode";
import { AppConfig } from "@/utils/AppConfig";
import AppLogo from "@/components/App/AppLogo";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import ModalMenu from "@/components/ModalMenu";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full bg-white p-0 text-gray-700 antialiased dark:bg-gray-900 dark:text-white">
    {props.meta}
    <div className="min-h-vh mx-auto h-10 w-full">
      <div className="flex items-center justify-between border-b border-gray-300 px-8 py-4 dark:border-neutral-500 dark:bg-gray-900 dark:text-white">
        <div className=" align-center flex items-center justify-between">
          <AppLogo />
        </div>
        <div className="text-right flex items-center">
          <MenuArea />
        </div>
      </div>

      <div className="content bg-neutral-100 dark:bg-neutral-800">
        {props.children}
      </div>
      <Footer />
    </div>
  </div>
);

const MenuArea = (props) => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  if (isTabletOrMobile) {
    return (
      <>
        <ConnectButton
          chainStatus={"icon"}
          showBalance={false}
          accountStatus={{ smallScreen: "avatar", largeScreen: "avatar" }}
        />
        <span className="ml-5">
          <ModalMenu />
        </span>
      </>
    );
  }

  return (
    <>
      <Link href="/card">
        <a className="text-xl font-semibold text-neutral-600 cursor-pointer mx-3">
          Impact Card
        </a>
      </Link>

      <div className="mx-4">
        <Link href="/quests">
          <button className="btn btn-s btn-emerald text-lg cursor-pointer mx-0">
            <span className="flex item-center">
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
      </div>
      <ConnectButton
        chainStatus={"icon"}
        showBalance={false}
        accountStatus={{ smallScreen: "avatar", largeScreen: "avatar" }}
      />
    </>
  );
};

const Footer = (props) => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 pt-16 mx-auto pb-8">
        <div className="flex flex-wrap md:text-left text-center order-first">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              Application
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link href="/card">
                  <a className="text-gray-600 hover:text-gray-800">
                    Impact Card
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/admin">
                  <a className="text-gray-600 hover:text-gray-800">Dashboard</a>
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              Card Integrations
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link href="/integration/ethic-hub">
                  <a className="text-gray-600 hover:text-gray-800">Ethic Hub</a>
                </Link>
              </li>
              <li>
                <Link href="/integration/impact-market">
                  <a className="text-gray-600 hover:text-gray-800">
                    impactMarket
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/integration/gitcoin">
                  <a className="text-gray-600 hover:text-gray-800">Gitcoin</a>
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              Information
            </h2>
            <nav className="list-none mb-10">
              {/* <li>
                <Link href="/how-it-works">
                  <a className="text-gray-600 hover:text-gray-800">
                    How It Works
                  </a>
                </Link>
              </li> */}
              <li>
                <a
                  href="https://celo.org/"
                  target={"_blank"}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Celo
                </a>
              </li>
              <li>
                <a
                  href="https://celo.org/about"
                  target={"_blank"}
                  className="text-gray-600 hover:text-gray-800"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="https://celo.org/developers"
                  target={"_blank"}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Developers
                </a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              About
            </h2>
            <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
              <p className="leading-relaxed text-lg text-neutral-600 mb-4">
                We see a world where creators and founders reshape local
                economies.
                <span className="font-bold">We are Celo.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
          <img className="w-8" src="/img/glyph.png" />
          <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
            © Copyright {new Date().getFullYear()} Celo Inc. {AppConfig.title}
          </p>
          {/* <AppColorMode className="mx-auto" /> */}
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a
              href="https://twitter.com/CeloOrg"
              target="_blank"
              className="ml-3 text-gray-500"
            >
              <svg
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export { Main };
