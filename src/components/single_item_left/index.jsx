import { Context } from "@/context";
import { usePrice } from "@/hooks/usePrice";
import Image from "next/image";
import { useContext } from "react";
import { FaRubleSign } from "react-icons/fa6";
import { IoLogoUsd } from "react-icons/io5";

const SingleLeft = (el) => {
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
    <div className="w-full pt-8 pr-5 overflow-hidden">
      <div>
        <Image
          alt="not implemented "
          width={200}
          height={200}
          className="mx-auto rounded-lg"
          src={el?.image?.large}
          loading="lazy"
        />
        <h2 className="text-[45px] text-white text-center font-[600] max-[400px]:text-[35px]">
          {el?.name}
        </h2>
        <p className="pl-8 text-slate-400 max-[400px]:text-[15px]">
          {el?.description?.en?.substring(0, 500)}.
        </p>
        <h3 className="pl-8 text-white text-[22px] pt-1 max-[400px]:text-[18px]">
          Rank: {el?.market_cap_rank}
        </h3>
        <h3 className="pl-8 flex text-white text-[22px] pt-1 max-[400px]:text-[18px] items-center gap-2">
          Current Price:
          <p className="font-[600] text-white flex items-center gap-2 ">
            {usePrice(
              getConvertedPrice(el?.market_data?.current_price?.usd, currency)
            )}
            {currency === "USD" ? <IoLogoUsd /> : null}
            {currency === "RUB" ? <FaRubleSign /> : null}
            {currency === "UZB" ? (
              <Image src={"/uzb.png"} alt="uzb" width={18} height={18} />
            ) : null}
          </p>
        </h3>
        <h3 className="pl-8 text-white text-[22px] pt-1 max-[400px]:text-[18px]">
          Market Cap: {usePrice(el?.market_data?.market_cap?.aed)} M
        </h3>
      </div>
    </div>
  );
};

export default SingleLeft;
