import classNames from "classnames";
import * as React from "react";
import { useEffect } from "react";

interface AppColorChildrenSwitchProps {
  className?: string;
  children: React.ReactNode;
}

export const AppColorChildrenSwitch = ({
  className,
  children,
}: AppColorChildrenSwitchProps) => {
  const classes = classNames(
    className,
    "toggle-theme color-mode cursor-pointer"
  );
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setMode("dark");
    } else {
      setMode("light");
    }
    // document.documentElement.classList.add("light");
    // document.documentElement.classList.remove("dark");
  }, []);

  return (
    // @ts-ignore
    <div className={classes}>{mode === "dark" ? children[1] : children[0]}</div>
  );
};

export default AppColorChildrenSwitch;
