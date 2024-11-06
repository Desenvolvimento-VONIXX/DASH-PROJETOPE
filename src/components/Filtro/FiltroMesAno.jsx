import React, { useEffect, useState } from "react";

function FiltroMesAno({ onFilterChange }) {
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');
    const [erro, setErro] = useState('');

    const handleFilterClick = () => {
        if (dataInicial && dataFinal) {
            const formattedDataInicial = formatDate(dataInicial);
            const formattedDataFinal = formatDate(dataFinal);
            onFilterChange(formattedDataInicial, formattedDataFinal);
            setErro(''); 
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        if (dataInicial && dataFinal && new Date(dataInicial) > new Date(dataFinal)) {
            setErro('A Data Inicial não pode ser posterior à Data Final.');
        } else {
            handleFilterClick();
        }
    }, [dataInicial, dataFinal]);

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex space-x-4"> {/* Adicionando flex-row para exibir os inputs lado a lado */}
                <div className="relative max-w-sm flex-1"> 
                    <label htmlFor="data-inicial" className="block">Data Inicial</label>
                    <input
                        id="data-inicial"
                        type="date"
                        className={`p-2 bg-gray-50 border ${erro ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full`}
                        value={dataInicial}
                        onChange={(e) => setDataInicial(e.target.value)}
                    />
                </div>
                <div className="relative max-w-sm flex-1"> 
                    <label htmlFor="data-final" className="block">Data Final</label>
                    <input
                        id="data-final"
                        type="date"
                        className={`p-2 bg-gray-50 border ${erro ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full`}
                        value={dataFinal}
                        onChange={(e) => setDataFinal(e.target.value)}
                    />
                </div>
            </div>
            {erro && <div className="text-red-500">{erro}</div>} 
        </div>
    );
}

export default FiltroMesAno;
