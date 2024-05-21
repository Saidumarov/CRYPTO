import { Context } from "@/context";
import { usePrice } from "@/hooks/usePrice";
import Image from "next/image";
import React, { useContext } from "react";

const WatchCard = (el) => {
  const { time, setTime, reload, setReload } = useContext(Context);

  const remove = (id) => {
    const watchs = JSON.parse(localStorage.getItem("watchs")) || [];
    if (watchs) {
      const update = watchs?.filter((el) => el?.id !== id);
      localStorage.setItem("watchs", JSON.stringify(update));
      setReload(update);
    }
  };
  return (
    <>
      <div className="w-[45%] h-[250px] bg-[#14151a] rounded-2xl pt-5 mt-5 overflow-hidden">
        <Image
          src={el.image?.large}
          alt={el.name}
          width={118}
          height={118}
          className="mx-auto"
        />
        <p className=" pt-5 flex items-center gap-2 justify-center font-[600] text-[18px] text-center text-white">
          ₹ {usePrice(el?.market_data?.current_price?.usd)}
        </p>
        <button
          onClick={() => remove(el?.id)}
          className="w-[106px] h-[30px] bg-red-500 block text-white mx-auto mt-2"
        >
          Remove
        </button>
      </div>
    </>
  );
};

export default WatchCard;
