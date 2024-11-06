import React, { useState, useEffect } from "react";
import { useConsultar } from "../../../hook/useConsultar";
import Snipper from "../Snipper";

function TableAcoes({ color, estrategia }) {
  const [result, setResult] = useState([]);
  const [consulta, setConsulta] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  useEffect(() => {
    const novaConsulta = `
      SELECT 
        ACAO AS ACAO,  
        RESPONSAVEL AS RESPONSAVEL, 
        CONVERT(VARCHAR(10), DT_FIM_PANEJAMENTO, 103) AS FIM_PLANEJADO,
        CASE 
          WHEN STATUS = 'ESPERA' THEN 'NÃO INICIADO' 
          WHEN STATUS = 'ANDAMENTO' THEN 'EM ANDAMENTO'
          ELSE STATUS 
        END AS STATUS
      FROM SANKHYA.AD_PROJETOPE WHERE ESTRATEGIA = '${estrategia}'
    `;
    setConsulta(novaConsulta);
  }, [estrategia]);

  const { data, loading, error } = useConsultar(consulta);

  useEffect(() => {
    if (data && data.length > 0) {
      const formattedData = data.map((item) => ({
        acao: item.ACAO,
        responsavel: item.RESPONSAVEL,
        fim_planejado: item.FIM_PLANEJADO,
        status: item.STATUS,
      }));
      setResult(formattedData);
    }
  }, [data]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setResult((prevResult) => {
      const sortedData = [...prevResult].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      return sortedData;
    });
  };

  if (loading) {
    return <Snipper />;
  }

  if (error) {
    return (
      <div>
        <p className="font-bold text-white text-[25px]">Error</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto w-[100%] h-[25vh] p-[10px]">
      <table
        className="w-full text-sm text-left rtl:text-right text-gray-500"
        style={{ backgroundColor: color, borderRadius: '10px' }}
      >
        <thead className="text-xs text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-[5px] py-3" onClick={() => requestSort('acao')}>Ação</th>
            <th scope="col" className="px-[5px] py-3" onClick={() => requestSort('responsavel')}>Responsável</th>
            <th scope="col" className="px-[2px] py-3" onClick={() => requestSort('fim_planejado')}>Fim Planejado</th>
            <th scope="col" className="px-[5px] py-3" onClick={() => requestSort('status')}>Status</th>
          </tr>
        </thead>
        <tbody>
          {result.map((item, index) => (
            <tr
              key={index}
              className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
            >
              <td scope="row" className="px-[2px] py-1 max-w-xs break-words">
                {item.acao}
              </td>
              <td className="px-[2px] py-1">{item.responsavel}</td>
              <td className="px-[2px] py-1">{item.fim_planejado}</td>
              <td className="px-[2px] py-1">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableAcoes;
