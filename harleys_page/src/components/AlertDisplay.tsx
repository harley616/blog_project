import { FC } from "react";
import { useAppSelector } from "../hooks/redux";

const AlertDisplay: FC = () => {
  const { message, good } = useAppSelector((state) => state.alert);
  if (!message) return null;
  return (
    <>
      {good ? (
        <div className="bg-green-500 w-fit absolute mx-auto left-0 right-0 text-white p-2 rounded">
          {message}
        </div>
      ) : (
        <div className="bg-red-500 w-fit absolute mx-auto left-0 right-0 text-white p-2 rounded">
          {message}
        </div>
      )}
    </>
  );
};

export default AlertDisplay;
