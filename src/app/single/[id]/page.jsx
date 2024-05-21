"use client";
import { Apiservice } from "@/api/api.service";
import Chart from "@/components/chart";
import ChartTimeline from "@/components/chart-timeline";
import LoadingProduct from "@/components/loading";
import SingleLeft from "@/components/single_item_left";
import { Context } from "@/context";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useContext } from "react";

const SinglePage = () => {
  const { id } = useParams();
  const { currency, setReload } = useContext(Context);
  const api = `https://api.coingecko.com/api/v3/coins/${id}`;
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
    queryKey: [id, currency],
    queryFn: getData,
  });

  if (isError) {
    return (
      <div className="text-center text-[26px] text-white pt-[25px]">
        Error: {error.message}
      </div>
    );
  }

  function addWatch(data) {
    const watchs = JSON.parse(localStorage.getItem("watchs")) || [];
    const IdWatch = watchs?.some((watch) => watch.id === data.id);
    if (!IdWatch) {
      const update = [...watchs, data];
      localStorage.setItem("watchs", JSON.stringify(update));
      setReload(update);
    }
  }

  return (
    <>
      {isLoading ? <LoadingProduct /> : null}
      <div className="w-full h-full flex min-[1800px]:w-[1500px] mx-auto flex-wrap pb-[150px]">
        <div className="w-[30%] max-[875px]:w-[100%]">
          <SingleLeft {...data} />
        </div>
        <div className="pt-16 relative overflow-hidden pr-8 w-[70%] border-l-2 border-slate-600 max-[875px]:w-[100%] max-[875px]:ml-8 max-[875px]:mt-12 max-[875px]:mb-20">
          <Chart id={[id, isLoading]} />
          <ChartTimeline />
        </div>
      </div>
    </>
  );
};

export default SinglePage;
