import HowToGetFunded from "@/components/HowToGetFunded";
import HowtoGetStarted from "@/components/HowtoGetStarted";
import ModalMintCard from "@/components/ModalMintCard";
import { Main } from "@/templates/Main";
import { Meta } from "@/templates/Meta";
import { AppConfig } from "@/utils/AppConfig";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

const Index = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <Main
      meta={
        <Meta
          title={`${AppConfig.title} | ${AppConfig.description}`}
          description={AppConfig.description}
        />
      }
    >
      <Hero />
      <HowtoGetStarted />
      <PublicGoodsQuests />
      {!isTabletOrMobile ? <QuestOptions /> : null}

      <PartnerFeature />
      <Introduction />
      {/* <RegenerativeFeature /> */}
      <HowToGetFunded />
    </Main>
  );
};
const Hero = (props) => {
  return (
    <div
      className="py-20 dark: mx-auto bg-gradient-to-br from-neutral-100 via-neutral-100 to-neutral-200 text-neutral-500 shadow-sm dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-900 dark:text-white px-20"
      style={{
        background: "linear-gradient(289.48deg, #305793 1.53%, #155941 98.41%",
      }}
    >
      <div className="container mx-auto max-w-screen-xl text-white">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-7 text-left flex justify-center items-center lg:pr-32">
            <div className="text-center lg:text-left">
              <div className="flex flex-col lg:flex-row items-center justify-start mb-4">
                <img
                  src="/img/celo-token-mono.png"
                  alt=""
                  className="w-7 mb-3 lg:mb-0 inline-block"
                />
                <span className="font-normal text-xl lg:text-2xl font-Primary ml-3">
                  Measure your impact on and cross-chain chain
                </span>
              </div>
              <h2 className="font-normal text-4xl md:text-7xl mb-10">
                Impact Cards
              </h2>
              <p className="text-lg lg:text-2xl leading-7 lg:leading-9">
                Showcase your public goods contributions on the Celo network and
                beyond.{" "}
                <span className="font-bold">
                  Activate your Impact Card today!
                </span>
              </p>
              <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start">
                <ModalMintCard className="w-full">
                  <button className="btn btn-lg btn-emerald my-3 w-full lg:my-10">
                    Activate Impact Card
                  </button>
                </ModalMintCard>
                <div className="mx-2" />
                
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 flex items-center justify-center flex-col">
            <div className="">
              <img className="w-full" src="/img/cards/card-blue.svg" alt="" />
              <p className="text-center my-2">
                Complete quests and the card automatically updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Introduction = (props) => {
  return (
    <section className="pt-20 pb-10 px-10 bg-white">
      <div className="container mx-auto max-w-screen-md text-center">
        <img src="/img/glyph.png" alt="" className="w-10 inline-block" />
        <h2 className="font-normal text-4xl mt-3 mb-10">
          Make a Difference 🌱 Evolve your Card
        </h2>
        <p className="leading-10 text-xl lg:text-2xl block">
          Showcase your <span className='font-bold'>public goods</span> contributions with an Impact Card. <br/> Each card is unique to the minter, tracking individual <span className='font-bold'>on-chain</span> and <span className='font-bold'>cross-chain</span> public goods actions.
        </p>
        <div className="flex items-center justify-center">
          <a href="https://celo.org/about" target={"_blank"}>
            <button className="btn btn-lg btn-white my-10">
              The Celo Mission
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

const PublicGoodsQuests = (props) => {
  return (
    <section className="px-10 py-10 lg:py-20">
      <div className="container mx-auto max-w-screen-xl grid grid-cols-12">
        <div className="lg:col-span-8 col-span-12 flex items-centers justify-centers lg:p-10 lg:pr-32">
          <div className="text-scenter">
            {/* <h3 className="font-normal text-lg lg:text-4xl">🌱</h3> */}
            <h1 className="title-font lg:text-6xl text-4xl mb-4 font-medium text-gray-900">
              Public Goods Quests IRL
            </h1>
            <h3 className="font-normal text-2xl lg:text-3xl text-neutral-600">
              <span className="text-emerald-600">Do good</span>,and watch your Impact Card <span className='text-emerald-600'>automatically update</span>.
            </h3>
            <div className="my-10" />
            <p className="leading-relaxed text-xl text-xl lg:text-2xl mt-10">
              Impact Cards compose existing public goods protocols into a
              single, unified, and user-friendly experience.{" "}
              <span className="font-bold text-emerald-600">
                Impact Cards are designed
              </span>{" "}
              to be a{" "}
              <span className="font-bold text-emerald-600">
                cross-chain solution
              </span>{" "}
              to incentivize and track public goods contributions, without
              complicated upkeep.
            </p>
          </div>
        </div>
        <div className="lg:col-span-4 col-span-12 flex items-center justify-center">
          <div
            className="max-w-screen-sm mx-auto"
            style={
              {
                // marginLeft: "-20%",
                // width: "120%",
              }
            }
          >
            <img
              className=" rounded"
              alt="hero"
              src="/img/cards/card-complete.svg"
            />
            <ModalMintCard>
              <button className="btn btn-lg btn-emerald mt-8 w-full">
                Mint Impact Card
              </button>
            </ModalMintCard>
          </div>
        </div>
      </div>
    </section>
  );
};

const PartnerFeature = (props) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-2xl lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="/img/devices/ios-ethix.png"
          />
        </div>
        <div className="lg:flex-grow md:w-1/3 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font lg:text-6xl text-4xl mb-4 font-medium text-gray-900">
            Composability with Impact
          </h1>
          <p className="mb-8 leading-9 lg:text-xl lg:w-4/5">
          Users get a single card to track their public goods contributions, making it easy to understand and share individual impact while encouraging others to do the same.
          </p>
          <ul className="list-decimal pl-3 lg:text-xl">
            <li className="flex items-center mb-2">
              <span className="font-bold">EthicHub</span>
              <span className="ml-2">
                | Crowdlending Agricultural Communities
              </span>
            </li>
            <li className="flex items-center mb-2">
              <span className="font-bold">impactMarket</span>
              <span className="ml-2">| The Human Empowerment Protocol</span>
            </li>
            <li className="flex items-center mb-2">
              <span className="font-bold">Gitcoin</span>
              <span className="ml-2">| Build and Fund Open Web3 Together</span>
            </li>
          </ul>
          {/* <p className="mb-8 leading-9 lg:text-xl lg:w-4/5">
            <span className="font-bol">
              Creating positive feedback loops for entire public goods
              ecosystems.
            </span>
          </p> */}
          <Link href="/quests">
            <button className="btn btn-lg btn-emerald w-full my-6">
              <span className="text-3xl">View Impact Quests</span>
            </button>
          </Link>
          <div className="mx-2" />
        </div>
      </div>
    </section>
  );
};

const QuestOptions = (props) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto text-center">
        <div className="flex flex-wrap -m-4">
          <div className="p-4 md:w-1/3">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <img
                className="lg:h-48 md:h-36 w-full  "
                src="/img/cards/card-impact-market.svg"
                alt="blog"
              />
              <div className="p-6">
                <h1 className="title-font text-3xl font-medium text-emerald-900 mb-3">
                  impactMarket
                </h1>
                <p className="leading-relaxed text-xl mb-3">
                  Donate to the Human Empowerment Protocol.
                </p>
                <Link href="/integration/impact-market">
                  <button className="btn btn-emerald">View Steps</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="p-4 md:w-1/3">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <img
                className="lg:h-48 md:h-36 w-full  "
                src="/img/cards/card-ethic-hub.svg"
                alt="blog"
              />
              <div className="p-6">
                <h1 className="title-font text-3xl font-medium text-emerald-900 mb-3">
                  Ethic Hub
                </h1>
                <p className="leading-relaxed text-xl mb-3">
                  Secure lending to actual farmers via yield farming.
                </p>
                <Link href="/integration/ethic-hub">
                  <button className="btn btn-emerald">View Steps</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="p-4 md:w-1/3">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <img
                className="lg:h-48 md:h-36 w-full "
                src="/img/cards/card-gitcoin-grants.svg"
                alt="blog"
              />
              <div className="p-6">
                <h1 className="title-font text-3xl font-medium text-emerald-900 mb-3">
                  Gitcoin Grants
                </h1>
                <p className="leading-relaxed text-xl mb-3">
                  Contribute to funding Open Source.
                </p>
                <Link href="/integration/gitcoin">
                  <button className="btn btn-emerald">View Steps</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container mx-auto max-w-screen-lg text-center">
        <button className="btn btn-lg btn-emerald w-100">
          <span className="text-3xl">Start Public Goods Quests</span>
        </button>
      </div> */}
    </section>
  );
};

export default Index;
