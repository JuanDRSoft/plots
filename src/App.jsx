import { useEffect, useState } from "react";
import { commercialPlotsData, residentialPlotsData } from "../data";

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
    <div className="bg-gray-100 w-full h-full">
      <h1 className="flex justify-center pt-10 font-bold text-4xl bg-blue-700 pb-5 text-white shadow">
        Plots List
      </h1>

      <div className="p-10">
        <div className="flex bg-white p-5 rounded-md shadow">
          <label className="w-1/4 font-semibold">Enter the plot number</label>
          <input
            type="text"
            className="w-full border rounded-md bg-gray-50"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />

          <button
            className="bg-blue-700 text-white p-1 ml-5 rounded-md mr-5"
            onClick={onSearch}
          >
            Search
          </button>

          <select onChange={(e) => setSelect(e.target.value)} value={select}>
            <option>Residential Plots</option>
            <option>Commercial Plots</option>
          </select>

          <select
            onChange={(e) => setSelectBlock(e.target.value)}
            value={selectBlock}
          >
            {block.map((e) => (
              <option>{e}</option>
            ))}
          </select>
        </div>

        <div className="mt-5">
          {plot.map((e) => (
            <div className="bg-white mb-2 rounded-md shadow p-5 flex justify-between">
              <h1>Plot No. {e.plotNo}</h1>
              <p>{e.block}</p>
              <p>Size: {e.size}</p>
              <p>Status: {e.status}</p>
              <p>Corner: {e.corner}</p>
              <p>Extra Land: {e.extraland}</p>
              <p>Marlas: {e.marlas}</p>
              <p>Main Double Rain: {e.mainDoubleRoad}</p>
              <p>filling: {e.filling}</p>
              <p>Street No:{e.streetNo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
