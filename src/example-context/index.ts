import { createContext, useContext } from "react";

export const ExampleContext = createContext({ example: "example" });

export const useExampleContext = () => {
  const val = useContext(ExampleContext);
  if (!val)
    throw new Error("useExampleContext must be used within ExampleProvider");

  return val;
};
