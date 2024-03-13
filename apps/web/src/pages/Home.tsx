import { useState, useEffect } from 'react'
import Form from '../components/form';
import Card from '../components/card';
import Order from '../components/order';

function Home() {
    const [clients, setClients] = useState<any>([]);
    const [controlShowClients, setControlShowClients] = useState(false)
    const [controlShowForm, setControlShowForm] = useState(false)
    const [controlShowOrder, setControlShowOrder] = useState(false)
    const [filter, setFilter] = useState('')

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3003/clients');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setClients(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const clientsTsx = clients.filter((client: any) => {
        // Aplica lógica de filtro para nome, e-mail e telefone
        const clientInfo = `${client.name} ${client.email} ${client.phone_number}`.toLowerCase();
        return clientInfo.includes(filter.toLowerCase());
    }).map((client: any) => (
        <Card key={client.id} client={client} />
    ))

    return (
        <main className='flex flex-col justify-start items-center'>
            <section className='flex flex-col justify-start mt-20 gap-4'>
                <section className='flex gap-4'>
                    <button
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-64"
                        onClick={() => {
                            setControlShowClients(!controlShowClients)
                            setControlShowForm(false)
                            setControlShowOrder(false)
                        }}
                    >
                        {!controlShowClients ? 'Ver lista de clientes' : 'Ocultar lista de clientes'}
                    </button>
                    <button
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-64"
                        onClick={() => {
                            setControlShowForm(!controlShowForm)
                            setControlShowClients(false)
                            setControlShowOrder(false)
                        }}
                    >
                        Cadastrar um novo cliente
                    </button>
                    <button
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-64"
                        onClick={() => {
                            setControlShowOrder(!controlShowOrder)
                            setControlShowClients(false)
                            setControlShowForm(false)
                        }}
                    >
                        Gerar rota de clientes
                    </button>
                </section>

                {
                    controlShowClients &&
                    <section className={`flex justify-center`}>
                        <div className="w-72">
                            <div className="relative w-full min-w-[200px] h-10">
                                <input
                                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                    placeholder=" "
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                />
                                <label
                                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-black peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
                                >
                                    Filtrar por nome, e-mail ou telefone
                                </label>
                            </div>
                        </div>
                    </section>
                }


            </section>
            {
                controlShowClients &&
                <section className='mt-20 flex flex-wrap justify-center gap-3 w-5/6'>
                    {clientsTsx}
                </section>
            }

            {
                controlShowForm &&
                <section className='mt-20'>
                    <Form fetchData={fetchData} />
                </section>
            }

            {
                controlShowOrder &&
                <section className='mt-20 w-3/5 min-w-[400px] '>
                    <Order setControlShowOrder={setControlShowOrder} />
                </section>
            }
        </main>
    )
}

export default Home;