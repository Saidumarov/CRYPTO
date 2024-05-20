"use client";
import { useMemo, useContext } from "react";
import { Apiservice } from "@/api/api.service";
import Chart from "@/components/chart";
import ChartTimeline from "@/components/chart-timeline";
import LoadingProduct from "@/components/loading";
import SingleLeft from "@/components/single_item_left";
import { Context } from "@/context";
import useWatchStore from "@/store/useWatchStore";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const SinglePage = () => {
  const { id } = useParams();
  const api = `https://api.coingecko.com/api/v3/coins/${id}`;
  const { addWatch } = useWatchStore();
  const { time } = useContext(Context);

  const getData = async () => {
    try {
      const data = await Apiservice.fetching(api);
      addWatch(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [id],
    queryFn: getData,
  });

  const dates = useMemo(() => {
    if (!data) return [];

    const athDates = data?.market_data?.ath_date || {};
    const price = {};
    if (time === 24) {
      Object.assign(price, data?.market_data?.price_change_24h_in_currency);
    } else if (time === 30) {
      Object.assign(
        price,
        data?.market_data?.price_change_percentage_30d_in_currency
      );
    } else if (time === 3) {
      Object.assign(
        price,
        data?.market_data?.price_change_percentage_200d_in_currency
      );
    } else if (time === 1) {
      Object.assign(
        price,
        data?.market_data?.price_change_percentage_1y_in_currency
      );
    }

    return Object.keys(athDates).map((currency) => ({
      x: athDates[currency],
      y: price[currency] || 0,
    }));
  }, [data, time]);

  if (isLoading) {
    return <LoadingProduct />;
  }

  if (isError) {
    return (
      <div className="text-center text-[26px] text-white pt-[25px]">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="w-full h-full flex min-[1800px]:w-[1500px] mx-auto flex-wrap pb-[150px]">
      <div className="w-[30%] max-[875px]:w-[100%]">
        <SingleLeft {...data} />
      </div>
      <div className="pt-16 relative overflow-hidden pr-8 w-[70%] border-l-2 border-slate-600 max-[875px]:w-[100%] max-[875px]:ml-8 max-[875px]:mt-12 max-[875px]:mb-20">
        <Chart dates={dates} />
        <ChartTimeline />
      </div>
    </div>
  );
};

export default SinglePage;
