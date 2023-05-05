import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

export default function ModalEditar({
  isOpenEdit,
  id,
  setIsOpenEdit,
  setId,
  select,
  plot,
  setPlot,
}) {
  const [plotNo, setPlotNo] = useState("");
  const [block, setBlock] = useState("");
  const [typeBlock, setTypeBlock] = useState("plot");
  const [size, setSize] = useState("");
  const [extraLand, setExtraLand] = useState("");
  const [corner, setCorner] = useState("");
  const [marlas, setMarlas] = useState("");
  const [filling, setFilling] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [mainDoubleRain, setMainDoubleRain] = useState("");

  useEffect(() => {
    if (id) {
      const getID = async () => {
        const { data } = await axios.get(
          `https://plots-n18l.onrender.com/api/${select}/${id}`
        );

        setTypeBlock(select);
        setPlotNo(data.plotNo);
        setBlock(data.block);
        setExtraLand(data.extraLand);
        setCorner(data.corner);
        setMarlas(data.marlas);
        setFilling(data.filling);
        setStreetNo(data.streetNo);
        setMainDoubleRain(data.mainDoubleRain);
        setSize(data.size);
      };

      getID();
    }
  }, [id]);

  const edit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.put(
        `https://plots-n18l.onrender.com/api/${typeBlock}/${id}`,
        {
          plotNo,
          block,
          extraLand,
          corner,
          marlas,
          filling,
          streetNo,
          mainDoubleRain,
          size,
        }
      );

      console.log(data);
      const events = plot.map((eventState) =>
        eventState._id === data._id ? data : eventState
      );
      setPlot(events);
      closeModal();

      setPlotNo("");
      setBlock("");
      setExtraLand("");
      setCorner("");
      setMarlas("");
      setFilling("");
      setStreetNo("");
      setMainDoubleRain("");
      setSize("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `https://plots-n18l.onrender.com/api/${typeBlock}`,
        {
          plotNo,
          block,
          extraLand,
          corner,
          marlas,
          filling,
          streetNo,
          mainDoubleRain,
          size,
        }
      );

      console.log(data);
      setPlot([...plot, data]);
      closeModal();

      setPlotNo("");
      setBlock("");
      setExtraLand("");
      setCorner("");
      setMarlas("");
      setFilling("");
      setStreetNo("");
      setMainDoubleRain("");
      setSize("");
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setIsOpenEdit(!isOpenEdit);
    setId("");
  };

  return (
    <>
      <Transition appear show={isOpenEdit} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center"
                  >
                    {id ? "Edit" : "Crear"}
                  </Dialog.Title>
                  <div className="mt-4">
                    <form>
                      <label className="w-full">Type Plot</label>

                      <select
                        className="w-full mt-2 border border-gray-200 mb-2"
                        value={typeBlock}
                        onChange={(e) => setTypeBlock(e.target.value)}
                      >
                        <option value="plot">Residential Plots</option>
                        <option value="plotCommercial">Commercial Plots</option>
                      </select>

                      <label className="w-full">Plot No.</label>

                      <input
                        className="w-full mt-2 border border-gray-200 mb-2"
                        value={plotNo}
                        onChange={(e) => setPlotNo(e.target.value)}
                      />

                      <label className="w-full">Block</label>

                      <select
                        className="w-full mt-2 border border-gray-200 mb-2"
                        value={block}
                        onChange={(e) => setBlock(e.target.value)}
                      >
                        <option>Excetive Block</option>
                        <option>Block A</option>
                        <option>Block B</option>
                      </select>

                      <label className="w-full">Extra Land</label>

                      <input
                        className="w-full mt-2 border border-gray-200 mb-2"
                        onChange={(e) => setExtraLand(e.target.value)}
                        value={extraLand}
                      />
                      <label className="w-full">Corner</label>

                      <input
                        className="w-full mt-2 border border-gray-200 mb-2"
                        onChange={(e) => setCorner(e.target.value)}
                        value={corner}
                      />

                      <label className="w-full">Marlas</label>

                      <input
                        className="w-full mt-2 border border-gray-200 mb-2"
                        value={marlas}
                        onChange={(e) => setMarlas(e.target.value)}
                      />

                      <label className="w-full">Main Double Rain</label>

                      <input
                        className="w-full mt-2 border border-gray-200 mb-2"
                        value={mainDoubleRain}
                        onChange={(e) => setMainDoubleRain(e.target.value)}
                      />

                      <label className="w-full">Filling</label>

                      <input
                        className="w-full mt-2 border border-gray-200 mb-2"
                        value={filling}
                        onChange={(e) => setFilling(e.target.value)}
                      />

                      <label className="w-full">Steet No</label>

                      <input
                        className="w-full mt-2 border border-gray-200 mb-2"
                        value={streetNo}
                        onChange={(e) => setStreetNo(e.target.value)}
                      />

                      <label className="w-full">Size</label>

                      <input
                        className="w-full mt-2 border border-gray-200 mb-2"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                      />

                      {id ? (
                        <button
                          className="bg-blue-600 text-white font-semibold w-full rounded-md mt-2 cursor-pointer"
                          type="submit"
                          onClick={edit}
                        >
                          Editar
                        </button>
                      ) : (
                        <button
                          className="bg-blue-600 text-white font-semibold w-full rounded-md mt-2 cursor-pointer"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Crear
                        </button>
                      )}
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
