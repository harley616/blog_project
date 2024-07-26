import { FC, ReactElement } from "react";

const Modal: FC<{ children: ReactElement | ReactElement[]; show: boolean }> = ({
  children,
  show,
}) => {
  const hidden = show ? "" : "hidden";
  return (
    <div
      className={
        "fixed top-0 left-0 z-[500] w-full h-full bg-black bg-opacity-50 flex justify-center items-center " +
        hidden
      }
    >
      {children}
    </div>
  );
};

export default Modal;
