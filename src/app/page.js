"use client";
import Banner from "@/components/layouts/banner";
import React, { useContext, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MarketCap from "@/components/market_cap";
import Card from "@/components/card";
import { Apiservice } from "@/api/api.service";
import { useQuery } from "@tanstack/react-query";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Context } from "@/context";
const Home = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  const { setTime, currency } = useContext(Context);
  const paginationItemCount = 5;
  const BASE_URI = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`;
  const getData = async () => {
    try {
      const data = await Apiservice.fetching(BASE_URI);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: [currency],
    queryFn: getData,
  });

  const startOffset = itemOffset;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data?.slice(startOffset, endOffset);
  const pageCount = Math.ceil((data?.length || 0) / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    const newOffset = selectedPage * itemsPerPage;
    setItemOffset(newOffset);
  };

  let startPage = Math.max(
    0,
    itemOffset / itemsPerPage - Math.floor(paginationItemCount / 2)
  );
  let endPage = Math.min(startPage + paginationItemCount - 1, pageCount - 1);

  if (endPage - startPage < paginationItemCount - 1) {
    startPage = Math.max(0, endPage - paginationItemCount + 1);
  }

  useEffect(() => {
    setTime(1);
  }, []);

  return (
    <div>
      <Banner product={{ data, isLoading, isError }} />
      <MarketCap />
      <div className="w-[1200px] mx-auto max-[1230px]:w-[95%]  pb-16">
        {currentItems &&
          currentItems?.map((item) => {
            return <Card {...item} key={item?.id} />;
          })}
        <div>
          {/* Pagination component */}
          {data?.length > 0 ? (
            <Pagination className="mt-14">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className="next cursor-pointer rounded-[50%]  hover:bg-slate-600 "
                    onClick={() =>
                      setItemOffset((prevOffset) =>
                        Math.max(prevOffset - itemsPerPage, 0)
                      )
                    }
                  />
                </PaginationItem>
                {startPage > 0 && (
                  <PaginationItem>
                    <PaginationEllipsis className="text-[#5ca3c4]" />
                  </PaginationItem>
                )}
                {Array.from({ length: endPage - startPage + 1 }).map((_, i) => (
                  <PaginationItem key={startPage + i}>
                    <PaginationLink
                      onClick={() => handlePageClick(startPage + i)}
                      isActive={startPage + i === itemOffset / itemsPerPage}
                      className="cursor-pointer text-[#87CEEB]  hover:bg-slate-600 hover:text-[#87CEEB] rounded-[50%]"
                    >
                      {startPage + i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {endPage < pageCount - 1 && (
                  <PaginationItem>
                    <PaginationEllipsis className="text-[#5ca3c4]" />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext
                    className="next cursor-pointer rounded-[50%]  hover:bg-slate-600 "
                    onClick={() =>
                      setItemOffset((prevOffset) =>
                        Math.min(
                          prevOffset + itemsPerPage,
                          (pageCount - 1) * itemsPerPage
                        )
                      )
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
