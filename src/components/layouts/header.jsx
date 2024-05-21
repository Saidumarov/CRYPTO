"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { DrawerComponent } from "./drawer";
import { useContext } from "react";
import { Context } from "@/context";
const Header = () => {
  const { currency, setCurrency } = useContext(Context);
  const handleSelect = (value) => {
    setCurrency(value);
  };

  return (
    <header className="text-gray-600 body-font w-full shadow-md">
      <div className="w-[1200px] mx-auto max-[1230px]:w-[95%]">
        <div className=" flex flex-wrap p-5  items-center justify-between">
          <Link
            href={"/"}
            className="ml-3 text-xl text-[#87CEEB] flex title-font font-medium items-center "
          >
            CRYPTOFOLIO
          </Link>

          <nav className="max-[430px]:pt-2 max-[430px]:gap-5 flex flex-wrap items-center text-base justify-center gap-8 max-[550px]:gap-2">
            <Select value={currency} onValueChange={handleSelect}>
              <SelectTrigger className="w-[80px] bg-inherit text-white max-[550px]:w-[75px ">
                <SelectValue placeholder="USD" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup defaultValue="usd">
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="aud">BAA</SelectItem>
                  <SelectItem value="inr">INR</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="max-[430px]:hidden">
              <DrawerComponent />
            </div>
          </nav>
          <div className="max-[430px]:block hidden">
            <DrawerComponent />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
