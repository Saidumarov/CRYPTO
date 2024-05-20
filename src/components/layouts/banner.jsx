import { Context } from "@/context";
import { usePrice } from "@/hooks/usePrice";
import Image from "next/image";
import { useContext } from "react";
import { FaRubleSign } from "react-icons/fa6";
import { IoLogoUsd } from "react-icons/io5";
import Slider from "react-slick";

const Banner = ({ product }) => {
  const { data, isLoading, isError } = product;
  const { currency, setCurrency } = useContext(Context);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };

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
    <div
      style={{
        backgroundImage: 'url("/bg.jfif")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-[60vh] max-[800px]:h-[55vh] min-[1600px]:h-auto min-[1700px]:pb-20"
    >
      <h1 className="text-wrap text-center text-[55px] max-[800px]:text-[35px] max-[500px]:text-[25px] text-[#87CEEB] font-semibold pt-12">
        CRYPTOFOLIO WATCH LIST
      </h1>
      <p className="text-wrap text-center text-slate-500 max-[500px]:text-[14px]">
        Get all the Info regarding your favorite Crypto Currency
      </p>
      <div className="w-[1200px] max-[1230px]:w-[95%]  mx-auto h-[200px] mt-1 pt-12">
        <Slider {...settings}>
          {data?.map((el, i) => (
            <div
              key={i}
              className="cursor-pointer ml-24 max-[500px]:ml-16  max-[400px]:ml-12"
            >
              <Image
                className="rounded-md"
                src={el?.image}
                width={100}
                height={100}
                alt="not found"
              />
              <p className="uppercase flex gap-4 pt-2">
                <span className="text-white block">{el?.symbol}</span>
                <span
                  style={{
                    color: el?.price_change_24h?.toString().startsWith("-")
                      ? "red"
                      : "#0ECB81",
                  }}
                  className="text-[#0ECB81] block"
                >
                  {el?.price_change_24h?.toString().startsWith("-")
                    ? el?.price_change_24h
                        ?.toFixed(0)
                        ?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    : "+" +
                      el?.price_change_24h
                        ?.toFixed(2)
                        ?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  %
                </span>
              </p>
              <p className="text-white font-bold flex items-center gap-2 text-lg pt-1">
                {currency === "USD" ? <IoLogoUsd /> : null}
                {currency === "RUB" ? <FaRubleSign /> : null}
                {currency === "UZB" ? (
                  <Image src={"/uzb.png"} alt="uzb" width={18} height={18} />
                ) : null}
                <p>
                  {usePrice(getConvertedPrice(el?.current_price, currency))}
                </p>
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
