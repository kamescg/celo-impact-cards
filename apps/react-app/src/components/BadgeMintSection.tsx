import * as React from "react";
import classNames from "classnames";

interface BadgeMintSectionProps {
  className?: string;
  img?: string;
  title?: string;
  tag?: string;
  description?: string;
  children: React.ReactNode;
  price: string;
  contractAddress: string;
}

export const BadgeMintSection = ({
  className,
  children,
  img = "/img/impact-card-square.png",
  title,
  tag,
  description,
  price,
  contractAddress,
}: BadgeMintSectionProps) => {
  const containerClassName = classNames(className, "BadgeMintSection");
  return (
    <div className={containerClassName}>
      <section className="text-gray-600 body-font overflow-hidden bg-white px-10 ">
        <div className="container max-w-screen-lg py-24 mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-5 ">
              <img alt="ecommerce" className="w-full   rounded" src={img} />
            </div>
            <div className="col-span-12 lg:col-span-7 p-10">
              <h2 className="text-baseline lg:text-3xl title-font text-gray-600 tracking-widest">
                Campaign: {tag}
              </h2>
              <h1 className="text-gray-900 text-3xl lg:text-5xl title-font font-medium mb-1">
                {title}
              </h1>
              <div className="my-6">{children}</div>
              <div className="flex items-center">
                <span className="title-font font-medium text-2xl lg:text-3xl text-gray-900">
                  {price} CELO
                </span>
                <button className="btn btn-lg btn-emerald ml-auto">
                  Mint Badge
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BadgeMintSection;
