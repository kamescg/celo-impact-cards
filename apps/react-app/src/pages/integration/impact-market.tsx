import ButtonAddCeloNetwork from "@/components/ButtonAddCeloNetwork";
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
            The Human Empowerment Protocol
          </h3>
          <h1 className="title-font text-4xl text-7xl font-medium text-gray-900">
            impactMarket
          </h1>
          <p className="mb-8 leading-relaxed text-xl">
            impactMarket provides accessible financial services and tools to
            empower underprivileged people worldwide, unlocking opportunities
            and human potential.
          </p>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <div className="computer-container text-center">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="/img/devices/MacBook-impactmarket.png"
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
          Complete the impactMarket Quest by donating and earning $PACT.
        </p>
        <a
          className="w-full my-8 block"
          href="https://www.impactmarket.com/"
          target="_blank"
        >
          <button className="btn btn-blue py-3 w-full">
            <span className="text-2xl px-3 block py-2">
              impactMarket Application
            </span>
          </button>
        </a>
        <h3 className="font-normal text-5xl font-bold text-neutral-700">
          Step 1 - Swap CELO for cUSD
        </h3>
        <img className="my-10" src="/img/steps/impact-market/step-ubeswap.png" />
        <a target={"blank"} href="https://app.ubeswap.org/#/swap">
          <button className='btn btn-purple btn-lg w-full'>Go to Ubeswap</button>
        </a>
        <h3 className="font-normal text-5xl font-bold text-neutral-700">
          Step 2 - Approve your Contribution
        </h3>
        <img className="my-10" src="/img/steps/impact-market/step2.png" />
        <h3 className="font-normal text-5xl font-bold text-neutral-700">
          Step 3 - Donate
        </h3>
        <img className="my-10" src="/img/steps/impact-market/step3.png" />
      </div>
    </section>
  );
};

export default Index;
