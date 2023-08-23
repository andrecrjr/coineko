"use client";
import { useFetch } from "@/components/Hooks/useFetch";
import usePortfolioData from "@/components/Hooks/usePortfolioData";
import { TableComposition } from "@/components/shared/Layout";

import { CurrencyList } from "@/types";
import React from "react";

function PortfolioClientPage() {
  const { userPortfolioData } = usePortfolioData();
  const { data, isLoading, error } = useFetch<CurrencyList>(
    `/coins/markets?vs_currency=usd&ids=${encodeURIComponent(
      userPortfolioData?.join()
    )}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
  );
  console.log(data)

  if (isLoading) {
    return <p>Loading portfolio data</p>;
  }

  if(error){
    console.log(error)
    return <p>Problem with get data</p>
  }

  return <>{<TableComposition data={data||[]}/>}</>;
}

export default PortfolioClientPage;
