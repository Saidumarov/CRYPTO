const MarketCap = () => {
  return (
    <div className="w-[1200px] mx-auto max-[1230px]:w-[95%]">
      <h1 className="text-wrap text-center text-[25px]  max-[500px]:text-[18px] text-[#e5e3e3] font-semibold pt-5">
        Cryptocurrency Prices by Market Cap
      </h1>
      <input
        className="w-full h-[45px] outline-none rounded-md pl-8 bg-[#14151a] mt-5 text-white border-[#2c314d] border-[2px]"
        type="text"
        placeholder="Search For a Crypto Currency.."
      />
      <div className="w-full">
        <div className=" w-full h-[60px] px-5 bg-[#87CEEB] flex mt-5  items-center rounded-md justify-between">
          <p className="w-[50%] font-[600] max-[900px]:w-[25%] max-[470px]:text-[14px] max-[470px]:w-[15%] ">
            Coin
          </p>
          <p className="w-[16%] font-[600] max-[900px]:w-[25%]  max-[470px]:text-[14px]">
            Price
          </p>
          <p className="w-[16%] font-[600] text-center max-[900px]:w-[25%]  max-[900px]:text-left max-[470px]:text-[14px] max-[470px]:w-[30%]">
            24h Change
          </p>
          <p className="w-[16%] font-[600] text-right max-[900px]:w-[25%] max-[470px]:text-[14px] max-[470px]:w-[30%]">
            Market Cap
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketCap;
