import { useEffect, useState } from "react";
import { commercialPlotsData, residentialPlotsData } from "../data";
import Fondo from "../src/img/fondo.png";

export const block = ["Exective Block", "Block A", "Block B", "Block C"];

function App() {
  const [residentialPlots, setResidentialPlots] = useState([]);
  const [commercialPlots, setCommercialPlots] = useState([]);
  const [plot, setPlot] = useState([]);
  const [select, setSelect] = useState("Residential Plots");
  const [selectBlock, setSelectBlock] = useState("Exective Block");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const onSearch = () => {
    if ([search, select].includes("")) {
      return;
    }

    if (select === "Residential Plots") {
      const filter = residentialPlotsData.filter(
        (e) => e.plotNo == search && e.block.includes(selectBlock)
      );
      setPlot(filter);
    }

    if (select === "Commercial Plots") {
      const filter = commercialPlotsData.filter(
        (e) => e.plotNo == search && e.block.includes(selectBlock)
      );
      setPlot(filter);
    }
  };

  return (
    <div className="w-full h-full">
      <img src={Fondo} class="fixed -z-10 md:w-full w-screen h-screen top-0" />
      <div className="md:flex">
        <div className="bg-glass md:p-10 rounded-md shadow  md:w-1/2 md:h-screen md:flex items-center">
          <div className="w-full justify-center">
            <h1 className="text-7xl md:mb-24 font-semibold text-center mb-10 pt-10 md:pt-0">
              Find Your Plot
            </h1>
            <div className="md:flex justify-center md:p-0 p-5">
              <input
                type="number"
                className="md:border-t md:border-l md:border-b rounded-l-md md:rounded-r-none rounded-r-md border bg-gray-50 border-blue-700 outline-none pl-3 w-full p-2 md:p-0"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="Enter your Plot No."
              />

              <select
                onChange={(e) => setSelect(e.target.value)}
                value={select}
                className="bg-gray-50 border-blue-700 border-t border-l border-b w-1/2 md:w-52 rounded-l-md md:mt-0 mt-3 md:rounded-l-none p-3 md:p-0"
              >
                <option>Residential Plots</option>
                <option>Commercial Plots</option>
              </select>
              <select
                onChange={(e) => setSelectBlock(e.target.value)}
                value={selectBlock}
                className="bg-gray-50 border-blue-700 border w-1/2 md:w-52 rounded-r-md md:mt-0 mt-3 md:rounded-r-none mb-5 md:mb-0 p-3 md:p-0 "
              >
                {block.map((e) => (
                  <option>{e}</option>
                ))}
              </select>

              <button
                className="bg-blue-700 text-white p-3 rounded-r-md w-full lg:w-1/4 font-bold hover:bg-blue-800 duration-500 flex items-center gap-2 justify-center rounded-l-md md:rounded-l-none"
                onClick={onSearch}
              >
                SEARCH
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 md:w-1/2 md:p-10 p-2 flex items-center">
          {plot.map((e) => (
            <div className="bg-white mb-2 rounded-md shadow-lg p-5 justify-between w-full">
              <div className="flex justify-between items-baseline">
                <h1 className="text-3xl font-bold">Plot No. {e.plotNo}</h1>
                <p className="font-semibold text-xl">
                  Block:{" "}
                  <span className="font-normal text-blue-700">{e.block}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 mt-5 mb-5">
                <p className="font-semibold mt-5 text-lg">
                  Size:{" "}
                  <span className="font-normal text-blue-700">{e.size}</span>
                </p>
                <p className="font-semibold mt-5 text-lg">
                  Status:{" "}
                  <span className="font-normal text-blue-700">{e.status}</span>
                </p>
                <p className="font-semibold mt-5 text-lg">
                  Corner:{" "}
                  <span className="font-normal text-blue-700">{e.corner}</span>
                </p>
                <p className="font-semibold mt-5 text-lg">
                  Extra Land:{" "}
                  <span className="font-normal text-blue-700">
                    {e.extraLand}
                  </span>
                </p>
                <p className="font-semibold mt-5 text-lg">
                  Marlas:{" "}
                  <span className="font-normal text-blue-700">{e.marlas}</span>
                </p>
                <p className="font-semibold mt-5 text-lg">
                  Main Double Rain:{" "}
                  <span className="font-normal text-blue-700">
                    {e.marlasDoubleRain}
                  </span>
                </p>
                <p className="font-semibold mt-5 text-lg">
                  filling:{" "}
                  <span className="font-normal text-blue-700">{e.filling}</span>
                </p>
                <p className="font-semibold mt-5 text-lg">
                  Street No:{" "}
                  <span className="font-normal text-blue-700">
                    {e.streetNo}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
