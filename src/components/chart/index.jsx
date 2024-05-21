"use client";
import { Apiservice } from "@/api/api.service";
import { Context } from "@/context";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useContext } from "react";
import ReactApexChart from "react-apexcharts";
import ChartLoading from "../loading/chartLoading";

const Chart = ({ id: idArray }) => {
  const [id, loading] = idArray;
  const { time, currency } = useContext(Context);
  const api = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${time}`;

  const getData = async () => {
    try {
      const data = await Apiservice.fetching(api);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [id, time, currency],
    queryFn: getData,
  });

  const [chartOptions, setChartOptions] = useState({
    series: [
      {
        name: "Valyuta",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        text: "Stock Price Movement",
        align: "left",
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val.toFixed(2);
          },
        },
        title: {
          text: "Price",
        },
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return val.toFixed(2);
          },
        },
      },
    },
  });

  useEffect(() => {
    if (data?.prices) {
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        series: [
          {
            name: "Valyuta",
            data: data.prices,
          },
        ],
      }));
    }
  }, [data]);

  return (
    <div>
      {loading == false && isLoading ? <ChartLoading /> : null}
      <div id="chart">
        <ReactApexChart
          options={chartOptions.options}
          series={chartOptions.series}
          type="area"
          height={450}
        />
      </div>
    </div>
  );
};

export default Chart;
