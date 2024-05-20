import { Context } from "@/context";
import { usePrice } from "@/hooks/usePrice";
import useWatchStore from "@/store/useWatchStore";
import Image from "next/image";
import React, { useContext } from "react";
import { FaRubleSign } from "react-icons/fa6";
import { IoLogoUsd } from "react-icons/io5";

const WatchCard = (el) => {
  const { removeWatch } = useWatchStore();
  const { currency, setCurrency } = useContext(Context);
  const getConvertedPrice = (price, currency) => {
    switch (currency) {
      case "USD":
        return price;
      case "RUB":
        return price * 90;
      case "UZB":
        return price * 12652;
      default:
        return price;
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
          {currency === "USD" ? <IoLogoUsd /> : null}
          {currency === "RUB" ? <FaRubleSign /> : null}
          {currency === "UZB" ? (
            <Image src={"/uzb.png"} alt="uzb" width={18} height={18} />
          ) : null}

          {usePrice(
            getConvertedPrice(el?.market_data?.current_price?.usd, currency)
          )}
        </p>
        <button
          onClick={() => removeWatch(el?.id)}
          className="w-[106px] h-[30px] bg-red-500 block text-white mx-auto mt-2"
        >
          Remove
        </button>
      </div>
    </>
  );
};

export default WatchCard;
