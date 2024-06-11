"use client";

import Navbar from "./components/Navbar";
import dynamic from "next/dynamic";
import { useEffect } from "react";

// Dynamic import of Plotly without SSR
const Plotly = dynamic(() => import("plotly.js-dist-min"), { ssr: false });

export default function Home() {

  useEffect(() => {
    const initializePlot = async () => {
      const Plotly = await import("plotly.js-dist-min");

      const xArray = ["2018", "2019", "2020", "2021"];
      const yArray1 = [10871740,10922769,9784965,13264528];
      const yArray2 = [9748277,9645736,9352888,11179554];
      const compared = [10871740/9748277,10922769/9645736,9784965/9352888,13264528/11179554];

      const dataSeperate = [
        {
          x: xArray,
          y: yArray1,
          name: 'Revenue',
          type: 'line',
          marker: {
            color: 'rgba(0, 50, 255, 1)' // Custom color for the first set of bars
          }
        },
        {
          x: xArray,
          y: yArray2,
          name: 'Expenses',
          type: 'line',
          marker: {
            color: 'rgba(255, 0, 0, 1)' // Custom color for the first set of bars
          }
        }
      ];

      const layout = { title: "Historical Revenue vs. Expenses" };

      const dataCompared = [
        {
          x: xArray,
          y: compared,
          name: 'Revenue / Expenses',
          type: 'line',
          marker: {
            color: 'rgba(0, 50, 255, 1)' // Custom color for the first set of bars
          }
        }
      ];

      const layout2 = { title: "Historical Revenue / Expenses" };

      Plotly.newPlot("SeperateData", dataSeperate, layout);
      Plotly.newPlot("ComparedData",dataCompared, layout2);
    };

    initializePlot();
  }, []);

  return (
    <div className="overflow-auto h-screen">
      <Navbar/>
      
      {/* Plotly Testing !!! */}
      <section className="min-h-screen bg-white text-gray-900 px-6 md:px-12 font-serif">
        <div className="flex flex-col justify-center items-center text-center py-40">
          <h2 className="text-2xl md:text-5xl mb-4 md:mb-6">Second Chance Inc.</h2>
          <div id="SeperateData" style={{ width: "50%", height: "500px" }}></div>
        </div>
      </section>
      <section className="min-h-screen bg-white text-gray-900 px-6 md:px-12 font-serif">
        <div className="flex flex-col justify-center items-center text-center py-40">
          <div id="ComparedData" style={{ width: "50%", height: "500px" }}></div>
        </div>
      </section>
    </div>
  );
}