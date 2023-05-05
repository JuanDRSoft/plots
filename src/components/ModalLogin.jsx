import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { pass } from "../utils/data";

export default function ModalLogin({ openModal, isOpen }) {
  const [password, setPassword] = useState("");

  const login = () => {
    if (password == pass) {
      localStorage.setItem("token", pass);
    }
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={openModal}>
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
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Login
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={login}>
                      <label className="w-full">Password</label>

                      <input
                        className="w-full mt-2 border border-gray-200"
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <input
                        type="submit"
                        className="bg-blue-600 text-white font-semibold w-full rounded-md mt-2"
                      />
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
