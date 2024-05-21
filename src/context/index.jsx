"use client";
import { createContext, useState } from "react";
export const Context = createContext();
function ContextProvider({ children }) {
  const [currency, setCurrency] = useState("usd");
  const [time, setTime] = useState(1);
  const [reload, setReload] = useState(null);

  return (
    <div>
      <Context.Provider
        value={{
          currency,
          setCurrency,
          time,
          setTime,
          reload,
          setReload,
        }}
      >
        {children}
      </Context.Provider>
    </div>
  );
}

export default ContextProvider;
