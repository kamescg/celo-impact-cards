import { Main } from "@/templates/Main";
import { Meta } from "@/templates/Meta";
import { AppConfig } from "@/utils/AppConfig";

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
      <Information />
    </Main>
  );
};

const Hero = (props) => {
  return (
    <section className="text-gray-600 body-font bg-white">
      <div className="container mx-auto max-w-6xl flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h3 className="font-normal text-2xl">
            Build and Fund Open Web3 Together
          </h3>
          <h1 className="title-font text-4xl text-7xl font-medium text-gray-900">
            Gitcoin
          </h1>
          <p className="mb-8 leading-relaxed text-xl">
            Gitcoin is the community of builders, creators, and protocols at the
            center of open web ecosystems. People come to Gitcoin to develop
            their future, and the future of the open internet.
          </p>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <div className="computer-container text-center">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="/img/devices/MacBook-gitcoin.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Information = (props) => {
  return (
    <section className="py-20 px-10 content">
      <div className="container mx-auto max-w-screen-sm ">
        <h2 className="font-normal text-7xl mt-3 mb-6">How It Works</h2>
        <p className="leading-10 text-lg block">
          Complete the Gitcoin Grant Quest by having previously contributed to any Gitcoin Grants Round.
        </p>
        <h3 className="font-normal text-3xl">Special Instructions</h3>
        <p className="text-xl leading-8">
          To complete the quest YOU MUST talk with a Celo staff member and show
          them your Gitcoin profile. You can find a Celo staff member in the{" "}
          <a href="https://t.me/celohackathons" target="_blank">
            Celo Discord
          </a>{" "}
          or in real life!
        </p>
        <a
          className="w-full my-8 block"
          href="https://celo.symm.fi/#/pool/0xad2f9f4cd2ae4f2dd2841eb1ea7e162fb4767d4d000200000000000000000033/invest"
          target="_blank"
        >
          <button className="btn btn-emerald py-3 w-full">
            <span className="text-2xl px-3 block py-2">
              Gitcoin Grants Application
            </span>
          </button>
        </a>
        <h3 className="font-normal text-5xl font-bold text-green-700">
          Step 1 - Donate to a Gitcoin Grant
        </h3>
        <img className="my-10" src="/img/steps/gitcoin/step1.png" />
        <h3 className="font-normal text-5xl font-bold text-green-700">
          Step 2 - Find Impact Card Steward
        </h3>
        <p className="text-xl leading-8">
          Impact Card stewards will verify your contribution IRL at DevCon Schelling Point.
        </p>
        <h3 className="font-normal text-5xl font-bold text-green-700">
          Step 3 - Migrate Cross-Chain Data
        </h3>
        <p className="text-xl leading-8">
          Once the cross-chain donation has been confirmed, the data will be migrated to the Celo blockchain and automatically update the Impact Card.
        </p>
      </div>
    </section>
  );
};

export default Index;
