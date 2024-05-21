"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import NoData from "../constants/svg";
import WatchCard from "../watchCard";
import { Context } from "@/context";

export function DrawerComponent() {
  const [watchs, setWatchs] = useState(null);
  const { reload } = useContext(Context);

  useEffect(() => {
    const watchs = JSON.parse(localStorage.getItem("watchs")) || [];
    if (watchs) {
      setWatchs(watchs);
    }
  }, [reload]);
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button className=" max-[550px]:py-2 max-[550px]:px-2 max-[550px]:text-[14px]  inline-flex items-center bg-[#87CEEB] hover:bg-[#5fb9dc] border-0 py-3 px-4 focus:outline-none rounded text-black  max-[430px]:py-3 max-[430px]:px-6 ">
          WATCH LIST
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="h-full w-[90%] mx-auto pt-8 pl-2 ">
          <h2 className="text-center text-[24px] text-white font-bold">
            WATCHLIST
          </h2>
          {watchs && watchs?.length > 0 ? (
            <div
              style={{ overflow: watchs?.length > 4 ? "auto" : "visible" }}
              className="flex  justify-between flex-wrap  h-[94%]  pb-[100px] "
            >
              {watchs && watchs?.map((el, i) => <WatchCard {...el} key={i} />)}
            </div>
          ) : (
            <div className=" w-[100%] h-[90%] mx-auto flex items-center justify-center ">
              <div>
                <NoData />
                <p className="uppercase text-center text-[18px] text-white pt-5">
                  No WATCHLIST
                </p>
              </div>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
