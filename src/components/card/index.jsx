import { Context } from "@/context";
import { usePrice } from "@/hooks/usePrice";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const Card = (el) => {
  const [isactive, setisActive] = useState(false);
  const [watchs, setWatchs] = useState();
  const watch = watchs?.some((watch) => watch?.id === el?.id);
  const { reload, setReload } = useContext(Context);
  useEffect(() => {
    setisActive(watch);
    const card = JSON.parse(localStorage.getItem("watchs"));
    if (card) {
      setWatchs(card);
    }
  }, [watch, reload]);

  return (
    <Link href={`/single/${el?.id}`}>
      <div className=" cursor-pointer w-full h-[60px] px-5 bg-[#16171A] mt-1 flex py-14 border-b-2 items-center border-[#282a31] justify-between">
        <div className="w-[50%] font-[600] flex  max-[900px]:w-[25%] max-[470px]:text-[14px] max-[550px]:w-[auto] max-[500px]:block">
          <Image
            src={el?.image}
            alt=""
            width={50}
            height={50}
            className="block rounded-[50%]"
          />
          <div className="text-white  ml-5 max-[500px]:mx-auto">
            <p className=" text-left text-[18px] uppercase">{el?.symbol}</p>
            <p className="text-[11px] text-[#737070]">{el?.name}</p>
          </div>
        </div>
        <p className="w-[16%] font-[600] text-white max-[900px]:w-[25%] flex items-center gap-1  max-[600px]:text-[14px] max-[550px]:w-[auto] max-[420px]:text-[12px]">
          ₹ {usePrice(el?.current_price)}
        </p>
        <p
          style={{
            color: el?.price_change_24h?.toString().startsWith("-")
              ? "red"
              : "#0ECB81",
          }}
          className="w-[16%] font-[600] pr-8 flex items-center gap-8  text-[#0ECB81] max-[900px]:w-[25%]  max-[600px]:text-[14px] max-[550px]:w-[auto]  max-[550px]:gap-1  max-[550px]:pr-0 max-[420px]:text-[12px] max-[430px]:block"
        >
          {isactive ? (
            <Image
              src="/kuz1.png"
              width={20}
              height={20}
              alt="not found"
              className="max-[430px]:mx-auto block"
            />
          ) : (
            <Image
              src="/kuz.png"
              width={20}
              height={20}
              alt="not found"
              className="max-[430px]:mx-auto block"
            />
          )}
          {el?.price_change_24h?.toString().startsWith("-")
            ? el?.price_change_24h
                ?.toFixed(0)
                ?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            : "+" +
              el?.price_change_24h
                ?.toFixed(2)
                ?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          %
        </p>
        <p className="w-[16%] font-[600] text-right  text-white  max-[900px]:w-[25%] max-[600px]:text-[14px] max-[550px]:w-[auto] max-[420px]:text-[12px]">
          ₹ {usePrice(el?.market_cap)}M
        </p>
      </div>
    </Link>
  );
};

export default Card;
