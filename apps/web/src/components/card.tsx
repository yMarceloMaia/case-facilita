import { useState } from "react";

function Card({ client }: any) {
    const [controlModal, setControlModal] = useState(true)

    return (
        <div className={`max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md w-52 h-32 relative`}>

            <h5 className="mb-2 text-2xl tracking-tight text-gray-900 ">
                {client.name}
            </h5>
            <a
                href="#"
                onClick={() => {
                    setControlModal(!controlModal)
                }}
                className="inline-flex items-center px-3 py-2 text-sm text-center text-black bg-white rounded-lg hover:bg-[#e9e8e8] focus:ring-2 focus:outline-none focus:ring-black absolute bottom-2 right-3"
            >
                Detalhes
                <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                </svg>
            </a>

            <div id="default-modal" tabIndex={-1} aria-hidden="true" className={`${controlModal && 'hidden'} h-full bg-black bg-opacity-50 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-2xl max-h-full">

                    <div className="relative bg-[#f7f5ff] rounded-lg shadow ">

                        <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-300 rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                {client.name}
                            </h3>
                            <button
                                onClick={() => setControlModal(true)}
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal"
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className="p-4 md:p-5 space-y-4">
                            <div>
                                <p className="text-base leading-relaxed text-black ">
                                    <span className="font-bold">E-mail:</span> {client.email}
                                </p>
                                <p className="text-base leading-relaxed text-black ">
                                    <span className="font-bold">Telefone:</span> {client.phone_number}
                                </p>
                            </div>
                            <div>
                                <p className="text-base leading-relaxed text-black ">
                                    <span className="font-bold">Coordenada x:</span> {client.coordinate_x}
                                </p>
                                <p className="text-base leading-relaxed text-black ">
                                    <span className="font-bold"> Coordenada y:</span> {client.coordinate_y}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-300 rounded-b ">
                            <button
                                onClick={() => setControlModal(true)}
                                data-modal-hide="default-modal"
                                type="button"
                                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-64"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;