"use client";
import { createContext, useState } from "react";
export const Context = createContext();
function ContextProvider({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [time, setTime] = useState(24);

  return (
    <div>
      <Context.Provider
        value={{
          currency,
          setCurrency,
          time,
          setTime,
        }}
      >
        {children}
      </Context.Provider>
    </div>
  );
}

export default ContextProvider;
