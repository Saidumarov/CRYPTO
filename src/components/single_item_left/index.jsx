import { Context } from "@/context";
import { usePrice } from "@/hooks/usePrice";
import Image from "next/image";
import { useContext } from "react";

const SingleLeft = (el) => {
  const { currency } = useContext(Context);
  const priceUSD = usePrice(el?.market_data?.current_price?.usd);
  const priceAUD = usePrice(el?.market_data?.current_price?.aud);
  const priceINR = usePrice(el?.market_data?.current_price?.inr);
  const marketCapUSD = usePrice(el?.market_data?.market_cap?.usd);
  const marketCapAUD = usePrice(el?.market_data?.market_cap?.aud);
  const marketCapINR = usePrice(el?.market_data?.market_cap?.inr);
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
            ₹{" "}
            {currency === "usd"
              ? priceUSD
              : currency === "aud"
              ? priceAUD
              : currency === "inr"
              ? priceINR
              : null}
          </p>
        </h3>
        <h3 className="pl-8 text-white text-[22px] pt-1 max-[400px]:text-[18px]">
          Market Cap:{" "}
          {currency === "usd"
            ? marketCapUSD
            : currency === "aud"
            ? marketCapAUD
            : currency === "inr"
            ? marketCapINR
            : null}
          M
        </h3>
      </div>
    </div>
  );
};

export default SingleLeft;
