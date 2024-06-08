"use client";

import Navbar from "./components/Navbar";
import dynamic from "next/dynamic";
import { useEffect } from "react";

// Dynamic import of Plotly without SSR
const Plotly = dynamic(() => import("plotly.js-dist-min"), { ssr: false });

export default function Home() {

  const features = [
    {
      title: "Number of U.S. Nonprofits",
      imgSrc: "/img/concierge_1250.png",
      description: "1.7 Million"
    },
    {
      title: "Radiology Report Analyzer",
      imgSrc: "/img/concierge_1250.png",
      description: "Velocity MIPS Reporter is powered by our patent pending Velocity AI engine. By continuously analyzing radiology reports, you receive real-time feedback of your MIPS scores throughout the year."
    },
    {
      title: "MIPS Consulting",
      imgSrc: "/img/concierge_1250.png",
      description: "We host regular MACRA optimization sessions during the year to help your practice stay on track and allow faster intervention to optimize providers’ quality and financial performance."
    },
  ];

  useEffect(() => {
    const initializePlot = async () => {
      const Plotly = await import("plotly.js-dist-min");

      const xArray = ["Italy", "France", "Spain", "USA", "Argentina"];
      const yArray = [55, 49, 44, 24, 15];

      const data = [{
        x: xArray,
        y: yArray,
        type: "bar",
        orientation: "v",
        marker: { color: "rgba(0,0,255)" }
      }];

      const layout = { title: "World Wide Wine Production" };

      Plotly.newPlot("myPlot", data, layout);
    };

    initializePlot();
  }, []);

  return (
    <div className="overflow-auto h-screen">
      <Navbar/>
      
      {/* Plotly Testing !!! */}
      <section className="min-h-screen bg-white text-gray-900 px-6 md:px-12 font-serif">
        <div className="flex flex-col justify-center items-center text-center py-40">
          <h2 className="text-2xl md:text-5xl mb-4 md:mb-6">World Wide Wine Production</h2>
          <div id="myPlot" style={{ width: "100%", height: "500px" }}></div>
        </div>
      </section>
    </div>
  );
}