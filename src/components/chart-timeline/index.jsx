import { Context } from "@/context";
import React, { useContext } from "react";

const ChartTimeline = () => {
  const { time, setTime } = useContext(Context);
  return (
    <div className="w-full h-20 flex items-center px-8 justify-between flex-wrap">
      <button
        onClick={() => setTime(24)}
        style={{ backgroundColor: time === 24 ? "rgb(111, 204, 237)" : "" }}
        className="w-[20%] h-[35px] max-[530px]:w-[40%] max-[530px]:mt-1  border-[#87CEEB] border-[2px] rounded-md text-white"
      >
        24 Hours
      </button>
      <button
        onClick={() => setTime(30)}
        style={{ backgroundColor: time === 30 ? "rgb(111, 204, 237)" : "" }}
        className="w-[20%] h-[35px] max-[530px]:w-[40%] max-[530px]:mt-1 border-[#87CEEB] border-[2px] rounded-md text-white"
      >
        30 Days
      </button>
      <button
        onClick={() => setTime(3)}
        style={{ backgroundColor: time === 3 ? "rgb(111, 204, 237)" : "" }}
        className="w-[20%] h-[35px] max-[530px]:w-[40%] max-[530px]:mt-1 border-[#87CEEB] border-[2px] rounded-md text-white"
      >
        3 Months
      </button>
      <button
        onClick={() => setTime(1)}
        style={{ backgroundColor: time === 1 ? "rgb(111, 204, 237)" : "" }}
        className="w-[20%] h-[35px] max-[530px]:w-[40%] max-[530px]:mt-1 border-[#87CEEB] border-[2px] rounded-md text-white"
      >
        1 Year
      </button>
    </div>
  );
};

export default ChartTimeline;
