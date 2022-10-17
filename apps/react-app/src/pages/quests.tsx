import { Main } from "@/templates/Main";
import { Meta } from "@/templates/Meta";
import { AppConfig } from "@/utils/AppConfig";
import Link from "next/link";
import FormImpactCardMinterPreviewAndMint from "@/components/FormImpactCardMinterPreviewAndMint";
import HowToGetFunded from "@/components/HowToGetFunded";
import HowtoGetStarted from "@/components/HowtoGetStarted";
const Index = () => {
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
      {/* <QuestIntroduction /> */}
      <HowtoGetStarted />
      <ActivateCard />
      <QuestInformation
        company="impactMarket"
        title="The Human Empowerment Protocol"
        earnAmount="20"
        location="Schelling Point"
        image="/img/devices/MacBook-impactmarket.png"
        imageCard="/img/cards/card-impact-market.svg"
      >
        <p className="leading-relaxed text-xl">
          impactMarket provides accessible financial services and tools to
          empower underprivileged people worldwide, unlocking opportunities and
          human potential.
        </p>
        <Link href="/integration/impact-market">
          <button className="btn btn-emerald btn-lg w-full mt-4">
            <span className="text-2xl">View Quest Instructions</span>
          </button>
        </Link>
      </QuestInformation>
      <QuestInformation
        company="Ethic Hub"
        title="Crowdlending Agricultural Communities"
        earnAmount="20"
        location="Schelling Point"
        image="/img/devices/MacBook-ethix.png"
        imageCard="/img/cards/card-ethic-hub.svg"
      >
        <p className="leading-relaxed text-xl">
          The first DeFi protocol to secure lending by connecting Yield farmers
          to Actual farmers! You can buy bonds to lend money to the farmers or
          you can provide Ethix as collateral to secure the loans.
        </p>
        <Link href="/integration/ethic-hub">
          <button className="btn btn-emerald btn-lg w-full mt-4">
            <span className="text-2xl">View Quest Instructions</span>
          </button>
        </Link>
      </QuestInformation>
      <QuestInformation
        company="Gitcoin"
        title="Build and Fund Open Web3 Together"
        location="DevCon"
        image="/img/devices/MacBook-gitcoin.png"
        imageCard="/img/cards/card-gitcoin-grants.svg"
      >
        <p className="leading-relaxed text-xl">
          Gitcoin is the community of builders, creators, and protocols at the
          center of open web ecosystems. People come to Gitcoin to develop their
          future, and the future of the open internet.
        </p>
        <Link href="/integration/gitcoin">
          <button className="btn btn-emerald btn-lg w-full mt-4">
            <span className="text-2xl">View Quest Instructions</span>
          </button>
        </Link>
      </QuestInformation>
      <HowToGetFunded />
    </Main>
  );
};

const ActivateCard = (props) => {
  return (
    <section className="bg-neutral-200 py-10 pb-20">
      <div className="container mx-auto max-w-screen-md">
        <h3 className="text-center text-3xl lg:text-6xl text-neutral-700">
          Design &amp; Activate
        </h3>
        <FormImpactCardMinterPreviewAndMint />
      </div>
    </section>
  );
};

const QuestIntroduction = (props) => {
  return (
    <section className="text-gray-600 body-font">
      <div className=" container mx-auto max-w-screen-lg text-center px-20 pt-20">
        <h3 className="font-normal text-6xl text-emerald-500">
          How To Get Started
        </h3>
        <span className="font-normal text-2xl leading-10 mt-4">
          <span className="font-bold text-neutral-500">
            Getting started is easy.
          </span>{" "}
          Get your CELO wallet funded, design and activate your Impact Card.
          Start contributing to public goods.{" "}
          <span className="font-bold text-neutral-500">It's that simple.</span>
        </span>
      </div>
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden p-12">
          <img
            alt="feature"
            className=" h-full w-full"
            src="/img/cards/card-complete.svg"
          />
        </div>
        <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
          <div className="flex flex-col mb-10 lg:items-start items-center">
            <div className="flex-grow">
              <h2 className="text-emerald-700 text-3xl title-font font-medium mb-3">
                Step 1: Claim 1 CELO
              </h2>
              <p className="leading-relaxed text-xl">
                Find Celo stewards at DevCon Schelling Point or join the Discord
                and request 1 FREE CELO.
              </p>
              <a
                href="#claim-celo"
                className="mt-3 text-blue-500 hover:text-blue-600 inline-flex items-center text-xl font-bold"
              >
                Learn how to Claim 1 FREE CELO
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="flex flex-col mb-10 lg:items-start items-center">
            <div className="flex-grow">
              <h2 className="text-emerald-700 text-3xl title-font font-medium mb-3">
                Step 2: Activate Impact Card
              </h2>
              <p className="leading-relaxed text-xl">Design ad</p>
            </div>
          </div>
          <div className="flex flex-col mb-10 lg:items-start items-center">
            <div className="flex-grow">
              <h2 className="text-emerald-700 text-3xl title-font font-medium mb-3">
                Step 3: Complete Quests
              </h2>
              <p className="leading-relaxed text-xl">
                Blue bottle crucifix vinyl post-ironic four dollar toast vegan
                taxidermy. Gastropub indxgo juice poutine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Hero = (props) => {
  return (
    <section className="py-10 px-10">
      <div className="container mx-auto max-w-screen-lg text-center">
        <img
          src="/img/devcon-deva.jpeg"
          alt=""
          className="w-32 inline-block rounded-3xl shadow-lg mb-5 border-t-2 border-emerald-400 border-2"
        />
        <h3 className="font-normal text-2xl text-green-800">
          Plant the seeds of impact 🌱 Bogotá Colombia
        </h3>
        <h2 className="font-normal text-6xl lg:text-7xl mt-3 mb-10 text-emerald-500">
          Impact Quests at DevCon
        </h2>
        <p className="leading-7 block w-2/3 mx-auto text-xl">
          Start your impact journey by completing quests on both the Celo and
          other blockchain networks: Donate on{" "}
          <a
            target="_blank"
            className="text-blue-500 hover:text-blue-600"
            href="https://www.impactmarket.com/"
          >
            impactMarket
          </a>{" "}
          or crowdlend to agricultural projects in{" "}
          <a
            target="_blank"
            className="text-blue-500 hover:text-blue-600"
            href="https://ethix.ethichub.com/"
          >
            Ethic Hub
          </a>{" "}
          on Celo, and{" "}
          <span className="font-semibold">
            measure{" "}
            <a
              target="_blank"
              className="text-blue-400 hover:text-blue-600"
              href="https://gitcoin.co/grants/"
            >
              Gitcoin Grant Contributions
            </a>{" "}
            from any network!
          </span>
        </p>
      </div>
      <div className="rounded-lg container mx-auto max-w-screen-lg mt-20 overflow-hidden">
        <img
          alt="content"
          className=" w-full"
          src="/img/brand/evolving-light.png"
        />
      </div>
    </section>
  );
};

const QuestInformation = ({
  company = "Brand Name",
  title = "Impact Campaign",
  image = "https://dummyimage.com/720x600",
  imageCard = "https://dummyimage.com/720x600",
  location = "Celo Labs",
  children,
}: any) => {
  return (
    <section className="text-gray-600 body-font overflow-hidden px-8">
      <div className="container max-w-screen-xl py-10 lg:py-24 mx-auto">
        <div className="mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:py-6 mb-6 lg:mb-0 lg:pr-32">
            <h2 className="text-2xl title-font text-gray-600 tracking-widest">
              {company}
            </h2>
            <h1 className="text-emerald-700 text-5xl title-font font-medium mb-4">
              {title}
            </h1>
            <div className="flex mb-4 border-b-2 border-color-gray-700 border-gray-300 " />
            {children ? (
              children
            ) : (
              <p className="leading-relaxed text-xl">
                Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                sriracha taximy chia microdosing tilde DIY. XOXO fam inxigo
                juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
                seitan poutine tumeric. Gastropub blue bottle austin listicle
                pour-over, neutra jean.
              </p>
            )}
            <div className="my-8" />

            <div className="flex mb-4 border-b-2 border-color-gray-700 border-gray-300 " />
          </div>
          <div className="lg:w-1/2 w-full px mt-20 lg:mt-0">
            <div className="w-screen-3xl relative" style={{ width: "170%" }}>
              <div className="absolute pl--32 -top-14">
                <img
                  alt="ecommerce"
                  className=" inline-block max-w-sm"
                  src={imageCard}
                />
              </div>
              <img alt="ecommerce" className="lg:h-auto w-full " src={image} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
