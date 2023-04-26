import { useEffect, useState } from "react";
import { commercialPlotsData, residentialPlotsData } from "../data";

function App() {
  const [residentialPlots, setResidentialPlots] = useState([]);
  const [commercialPlots, setCommercialPlots] = useState([]);
  const [plot, setPlot] = useState([]);
  const [select, setSelect] = useState("Residential Plots");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getPlots = async () => {
  //     try {
  //       setLoading(true);

  //       setResidentialPlots(residentialPlotsData);
  //       setPlot(residentialPlotsData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getPlots();

  //   const getCommercialPlots = async () => {
  //     try {
  //       setCommercialPlots(commercialPlotsData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getCommercialPlots();
  // }, []);

  useEffect(() => {
    setLoading(true);
    if (select === "Residential Plots") {
      const filter = residentialPlotsData.filter((e) => e.plotNo == search);
      if (filter.length === 0) {
        setPlot(residentialPlotsData);
        setLoading(false);
      } else {
        setPlot(filter);
        setLoading(false);
      }
    }

    if (select === "Commercial Plots") {
      setLoading(true);
      const filter = commercialPlotsData.filter((e) => e.plotNo == search);
      if (filter.length === 0) {
        setPlot(commercialPlotsData);
        setLoading(false);
      } else {
        setPlot(filter);
        setLoading(false);
      }
    }
  }, [select, search]);

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
          <select onChange={(e) => setSelect(e.target.value)} value={select}>
            <option>Residential Plots</option>
            <option>Commercial Plots</option>
          </select>
        </div>

        <div className="mt-5">
          <div className="bg-white p-5 rounded-md shadow">
            <table className="mb-2">
              <tr>
                <th>Plot No.</th>
                <th>Block</th>
                <th>Size</th>
                <th>Status</th>
                <th>Corner</th>
                <th>Extra Land</th>
                <th>Marlas</th>
                <th>Main Double Road</th>
                <th>Filling/Solid Land</th>
                <th>Street No</th>
                <th>Notes</th>
              </tr>
            </table>
          </div>

          <div className="overflow-y-scroll h-96 bg-white p-5 rounded-md shadow mt-5">
            {loading ? (
              <div className="w-full h-full flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="text-gray-200 text-center animate-spin h-20 w-20 mr-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
            ) : (
              <table>
                {plot.map((e) => (
                  <tr>
                    <td className="text-center pr-7">{e.plotNo}</td>
                    <td>{e.block}</td>
                    <td>{e.size}</td>
                    <td>{e.status}</td>
                    <td>{e.corner}</td>
                    <td>{e.extraLand}</td>
                    <td>{e.marlas}</td>
                    <td>{e.mainDoubleRoad}</td>
                    <td>{e.filling}</td>
                    <td>{e.streetNo}</td>
                    <td>{e.notes}</td>
                  </tr>
                ))}
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
