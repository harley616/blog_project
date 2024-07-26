import { FC, ReactElement, ReactNode } from "react";

const Text: FC<{ children: string | ReactElement | ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <p className={"p-1 m-1 " + className}>{children}</p>;
};

export default Text;
