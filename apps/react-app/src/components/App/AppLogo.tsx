import classNames from "classnames";
import Link from "next/link";
import { AppConfig } from "@/utils/AppConfig";

interface AppLogoProps {
  className?: string;
  defaultStyle?: boolean;
}

export const AppLogo = ({ className, defaultStyle }: AppLogoProps) => {
  const classesBase = classNames(
    "flex items-center justify-between cursor-pointer "
  );
  const styleName = classNames(
    className,
    "app-logo",
    "font-semibold text-lg hover:opacity-70",
    {
      "text-purple-600 hover:text-purple-700": defaultStyle,
    }
  );
  return (
    <Link passHref={true} href="/">
      <span className={classesBase}>
        <img src="/img/glyph.png" alt="logo" className="h-5 mr-3" />
        <span className="">{AppConfig.emoji}</span>
        <span className={styleName}>{AppConfig.title}</span>
      </span>
    </Link>
  );
};

export default AppLogo;
