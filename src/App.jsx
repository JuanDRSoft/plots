import { useEffect, useState } from "react";
import Fondo from "../src/img/fondo.png";
import ModalLogin from "./components/ModalLogin";
import axios from "axios";
import { pass } from "./utils/data";
import ModalEditar from "./components/ModalEditar";

export const block = ["Exective Block", "Block A", "Block B", "Block C"];

function App() {
  const [residentialPlots, setResidentialPlots] = useState([]);
  const [commercialPlots, setCommercialPlots] = useState([]);
  const [plot, setPlot] = useState([]);
  const [select, setSelect] = useState("plot");
  const [selectBlock, setSelectBlock] = useState("Exective Block");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [log, setLog] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == pass) {
      setLog(true);
    }

    const getPlot = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://plots-n18l.onrender.com/api/plot"
        );

        setResidentialPlots(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getPlot();

    const getPlotC = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://plots-n18l.onrender.com/api/plotCommercial"
        );

        setCommercialPlots(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getPlotC();
  }, []);

  const onSearch = () => {
    if ([search, select].includes("")) {
      return;
    }

    if (select === "plot") {
      const filter = residentialPlots.filter(
        (e) =>
          Number(e.plotNo) === Number(search) && e.block.includes(selectBlock)
      );
      setPlot(filter);
    }

    if (select === "plotCommercial") {
      const filter = commercialPlots.filter(
        (e) =>
          Number(e.plotNo) === Number(search) && e.block.includes(selectBlock)
      );
      setPlot(filter);
    }
  };

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const openModalEdit = (id) => {
    setIsOpenEdit(!isOpenEdit);
    setId(id);
  };

  const remove = async (id) => {
    try {
      const data = await axios.delete(
        `https://plots-n18l.onrender.com/api/${select}/${id}`
      );

      const events = plot.filter((eventState) => eventState._id !== id);

      setPlot(events);
    } catch (error) {
      console.log(error);
    }
  };

  const nulls = "";

  return (
    <div className="w-full h-full">
      <img
        src={Fondo}
        className="fixed -z-10 md:w-full w-screen h-screen top-0"
      />
      <div className="md:flex">
        <div className="bg-glass md:p-10 rounded-md shadow  md:w-1/2 md:h-screen md:flex items-center">
          {log ? (
            <button
              className="absolute top-5 bg-blue-700 text-white font-semibold p-1 rounded-md"
              onClick={() => openModalEdit(nulls)}
            >
              Add Plot
            </button>
          ) : (
            <button
              className="absolute top-5 bg-blue-700 text-white font-semibold p-1 rounded-md"
              onClick={openModal}
            >
              Iniciar Sesión
            </button>
          )}
          <div className="w-full justify-center">
            <h1 className="text-7xl md:mb-24 font-semibold text-center mb-10 pt-20 md:pt-0">
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
                <option value="plot">Residential Plots</option>
                <option value="plotCommercial">Commercial Plots</option>
              </select>
              <select
                onChange={(e) => setSelectBlock(e.target.value)}
                value={selectBlock}
                className="bg-gray-50 border-blue-700 border w-1/2 md:w-52 rounded-r-md md:mt-0 mt-3 md:rounded-r-none mb-5 md:mb-0 p-3 md:p-0 "
              >
                {block.map((e) => (
                  <option key={e}>{e}</option>
                ))}
              </select>

              <button
                className="bg-blue-700 text-white p-3 rounded-r-md w-full lg:w-1/4 font-bold hover:bg-blue-800 duration-500 flex items-center gap-2 justify-center rounded-l-md md:rounded-l-none disabled:bg-blue-300"
                onClick={onSearch}
                disabled={loading}
              >
                {loading ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 animate-spin"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                ) : (
                  <>
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
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 md:w-1/2 md:p-10 p-2 grid items-center">
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

              {log ? (
                <div className="flex items-center gap-4">
                  <button
                    className="bg-blue-600 text-white w-full font-semibold uppercase p-1 rounded-md"
                    onClick={() => openModalEdit(e._id)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-600 text-white w-full font-semibold uppercase p-1 rounded-md"
                    onClick={() => remove(e._id)}
                  >
                    Eliminar
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>

      <ModalLogin isOpen={isOpen} openModal={openModal} />
      <ModalEditar
        isOpenEdit={isOpenEdit}
        setIsOpenEdit={setIsOpenEdit}
        id={id}
        setId={setId}
        select={select}
        plot={plot}
        setPlot={setPlot}
      />
    </div>
  );
}

export default App;
