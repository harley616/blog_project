import { FC, ReactElement } from "react";

const Box: FC<{
  className?: string;
  children: ReactElement | ReactElement[];
}> = ({ children, className }) => {
  return (
    <div className={"border rounded p-2 m-2 shadow bg-white " + className}>
      {children}
    </div>
  );
};

export default Box;
