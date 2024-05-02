"use client";

import Navbar from "@/components/nav";
import { useState } from "react";
import { BsSliders } from "react-icons/bs";
import { FaSearch, FaUserAlt } from "react-icons/fa";
// import Image from "next/image";

export default function Home() {
  const [data, setData] = useState([] as Category[]);
  const getData = async () => {
    if (data.length > 0) {
      return;
    }
    const res = await fetch(
      "https://ymtaz.sa/api/client/digital-guide/categories"
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    } else {
      const response = await res.json();
      if (response.data) {
        setData(response.data.categories);
      }
    }
    console.log(data);
  };
  getData();

  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <main className="">
      <div className="">
        <Navbar />
        <div className="content-home text-center my-10">
          <h1 className="text-3xl font-bold text-[#252525]">الدليل الرقمى</h1>
          {/* Search Input */}
          <div className="max-w-4xl mx-auto my-5 px-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-7 pointer-events-none">
                <BsSliders className="text-gray-400 h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-[#2D4768] text-white py-2 px-3 rounded-md pl-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FaSearch className="text-gray-400 h-5 w-5" />
              </div>
            </div>
          </div>
          {/* Categories Box */}
          <div className="container mx-auto my-10 p-3">
            <div className="row-all flex flex-wrap">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="col-item  p-3 xl:max-w-[33%] xl:basis-2/6 lg:max-w-[50%] lg:basis-3/6 max-w-full basis-full "
                >
                  <div
                    className="box-home relative cursor-pointer shadow-[0_0px_4px_1px] shadow-[#1018281A] hover:text-white rounded-2xl text-center py-3 mx-4 basis-1/3"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(-1)}
                  >
                    {/* Overlay with transition */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-[#CCA95A] to-[#8f763f] rounded-2xl text-center transition-opacity duration-700 opacity-0 ${
                        hoveredIndex === index ? "opacity-100" : ""
                      }`}
                    ></div>
                    <div className="content-box relative ">
                      <div
                        className={`icon-box shadow-[0_5px_30px_0px] flex relative justify-center items-center rounded-full w-32 h-32 mx-auto my-4 ${
                          hoveredIndex === index
                            ? "shadow-[#DDB762] !important bg-bg-gradient-to-r from-[#CCA95A] to-[#8f763f]"
                            : "shadow-[#F9DAD5] bg-white"
                        }`}
                      >
                        <FaUserAlt
                          className={`text-[#DDB762] text-4xl z-50 ${
                            hoveredIndex === index ? "text-white" : ""
                          }`}
                        />
                      </div>
                      <h2 className="text-2xl font-medium my-3">
                        {item.title}
                      </h2>
                      <p className="text-sm mb-3">
                        متوفر عدد {item.lawyers_count}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
