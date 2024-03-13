import { useEffect, useState } from "react";

function Order({ setControlShowOrder }: any) {
    const [orderData, setOrderData] = useState([]);
    const [checkedClients, setCheckedClients] = useState([]);

    const fetchOrderData = async () => {
        try {
            const response = await fetch('http://localhost:3003/calculate-router');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setOrderData(result);
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    useEffect(() => {
        fetchOrderData();
    }, []);

    const handleCheckClient = (clientId: number) => {
        const updatedOrderData = orderData.filter((client: any) => client.id !== clientId);
        const checkedClient = orderData.find((client: any) => client.id === clientId);
        const checked: any = [checkedClient, ...checkedClients]
        setOrderData(updatedOrderData);
        setCheckedClients(checked);
    };

    return (

        <div className="flex flex-col w-full justify-between border p-5 h-full bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center  md:inset-0 max-h-full" >
            <div className=" w-3/5 h-4/5">
                <div className="w-full h-full bg-[#f7f5ff] flex justify-center">
                    {
                        orderData.length > 2 ||  checkedClients.length > 0?

                            <div className="flex w-full h-full justify-around bg-opacity-100 bg-[#f7f5ff] p-10 overflow-auto">
                                <section >
                                    <h1 className="text-2xl">Clientes para atender</h1>
                                    <ul>
                                        {orderData.map((client: any, index) => {

                                            return (
                                                <li key={index} className="py-4">
                                                    <div className="mb-2">
                                                        <strong>{`${client.name === 'Starting Point' ? '' : 'Cliente'} ${client.name}:`}</strong>
                                                    </div>
                                                    <ul className="list-inside list-disc">
                                                        <li>{`Coordenada x: ${client.coordinate_x}`}</li>
                                                        <li>{`Coordenada y: ${client.coordinate_y}`}</li>
                                                    </ul>
                                                    {index === 0 && (
                                                        <button
                                                            onClick={() => handleCheckClient(client.id)}
                                                            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow "
                                                        >
                                                            {client.name === 'Starting Point' ? 'Iniciar rota' : 'Finalizado'}
                                                        </button>
                                                    )}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </section>
                                <section>
                                    <h1 className="text-2xl">Clientes já atendidos</h1>
                                    <ul>
                                        {checkedClients.map((client: any, index) => (
                                            <li key={index} className="py-4">
                                                <div className="mb-2">
                                                    <strong>{`Cliente ${client.name}:`}</strong>
                                                </div>
                                                <ul className="list-inside list-disc">
                                                    <li>{`Coordenada x: ${client.coordinate_x}`}</li>
                                                    <li>{`Coordenada y: ${client.coordinate_y}`}</li>
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                            </div>
                            :
                            <h1 className="text-4xl mt-20">Nenhum cliente cadastrado</h1>
                    }
                </div>
                <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-300 rounded-b ">
                    <button
                        onClick={() => setControlShowOrder(false)}
                        data-modal-hide="default-modal"
                        type="button"
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-64"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Order;