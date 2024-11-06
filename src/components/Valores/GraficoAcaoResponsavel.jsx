import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useConsultar } from "../../../hook/useConsultar";
import Snipper from "../Snipper";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrando os componentes do gráfico
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GraficoAcaoResponsavel() {
  const [result, setResult] = useState([]);
  const [consulta, setConsulta] = useState("");

  useEffect(() => {
    const novaConsulta = `
        SELECT 
        RESPONSAVEL AS RESPONSAVEL,
        COUNT(*) AS QNT 
        FROM SANKHYA.AD_PROJETOPE 
        GROUP BY RESPONSAVEL
        ORDER BY QNT DESC     
    `;
    setConsulta(novaConsulta);
  }, []);

  const { data, loading, error } = useConsultar(consulta);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const formattedData = data.map((item) => ({
        responsavel: item.RESPONSAVEL,
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

  const labels = result.map((item) => item.responsavel);
  const valores = result.map((item) => item.qnt);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Quantidade",
        data: valores,
        backgroundColor: "rgba(75, 192, 192, 0.6)", 
        borderColor: "rgba(75, 192, 192, 0)", 
        borderWidth: 0, 
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    indexAxis: "y", 
    scales: {
      x: {
        display: false, 
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          autoSkip: false, 
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop:"2%"
      }}
    >
      <Bar
        data={chartData}
        options={{
          ...chartOptions,
          responsive: true,
          maintainAspectRatio: false,
        }} 
      />
    </div>
  );
}

export default GraficoAcaoResponsavel;
