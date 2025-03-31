import React, { useEffect, useState } from "react";
import { useConsultar } from "../../../hook/useConsultar";
import Snipper from "../Snipper";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
 
ChartJS.register(ArcElement, Tooltip, Legend);
 
function GraficoStatusAndamento() {
  const [result, setResult] = useState([]);
  const [consulta, setConsulta] = useState("");
 
  useEffect(() => {
    const novaConsulta = `
           SELECT
            CASE
            WHEN STATUS = 'ANDAMENTO' THEN 'EM ANDAMENTO'
            WHEN STATUS = 'ESPERA' THEN 'NÃO INICIADO' 
            ELSE STATUS
            END STATUS,
            COUNT(*) AS QNT
            FROM SANKHYA.AD_PROJETOPE
            WHERE YEAR(DT_INICIO_PANEJAMENTO)= ${P_ANO}
            GROUP BY STATUS 
            `;
    setConsulta(novaConsulta);
  }, []);
 
  const { data, loading, error } = useConsultar(consulta);
 
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const formattedData = data
        .map((item) => ({
          status: item.STATUS,
          qnt: item.QNT,
        }));
      setResult(formattedData);
    }
  }, [data]);
 
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Snipper />
      </div>
    );
  }
 
  if (error)
    return (
      <div>
        <p className="font-bold text-white text-[25px]">Error</p>
      </div>
    );
 
  if (result.length === 0) {
    return (
      <div>
        <p className="font-bold text-white text-[25px]">
          Nenhum dado disponível
        </p>
      </div>
    );
  }
 
  const labels = result.map((item) => item.status);
  const valores = result.map((item) => item.qnt);

  const backgroundColors = labels.map(label => {
    if(label === null){return "rgba(255, 192, 203, 0.8)"; }

    switch (label.toUpperCase().trim()) {
        case "CONCLUIDO":
            return "rgba(173, 216, 230, 0.8)"; // Azul claro
        case "EM ANDAMENTO":
            return "rgba(144, 238, 144, 0.8)"; // Verde claro
        case "CANCELADO":
            return "rgba(255, 182, 193, 0.8)"; // Vermelho claro
        case "NÃO INICIADO":
              return "rgba(153, 51, 153, 0.8)"; // 
        case "ESPERA":
              return "rgba(197, 197, 82, 0.8)"; // 
        default:
            return "rgba(255, 192, 203, 0.8)"; // Rosa
    }
});
 
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Status em andamento",
        data: valores,
        backgroundColor: backgroundColors,
        borderColor: ["#fff"],
        borderWidth: 1,
      },
    ],
  };
 
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    rotation:-90,
    circumference:360,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,

      },
   
      datalabels: {
        color: "#000",
        align: "end",
        anchor: "start",
        formatter: (value, context) => {
            const label = context.chart.data.labels[context.dataIndex];
            return `${label}: ${value}`;
        },
        offset:10,
         clamp:true,
        // font:{
        //   size:8,
        // },
        padding:{
          top:2,
          bottom:4,
        }
    },
    },
    
  };
 
  return (
    <div
      style={{
        width: "100%",
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
}
 
export default GraficoStatusAndamento;