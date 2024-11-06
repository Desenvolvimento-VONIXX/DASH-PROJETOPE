import React, { useEffect, useState } from "react";
import { useConsultar } from "../../../hook/useConsultar";
import Snipper from "../Snipper";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Registrar os elementos do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ChartDataLabels
);

function GraficosAcoesEstrategia() {
  const [result, setResult] = useState([]);
  const [consulta, setConsulta] = useState("");

  useEffect(() => {
    const novaConsulta = `
        SELECT 
        ESTRATEGIA AS ESTRATEGIA,
        COUNT(*) AS QNT 
        FROM SANKHYA.AD_PROJETOPE 
        WHERE ESTRATEGIA IS NOT NULL
        GROUP BY ESTRATEGIA        
        `;
    setConsulta(novaConsulta);
  }, []);

  const { data, loading, error } = useConsultar(consulta);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const formattedData = data.map((item) => ({
        estrategia: item.ESTRATEGIA,
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

  const labels = result.map((item) => item.estrategia);
  const valores = result.map((item) => item.qnt);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Quantidade Ações",
        data: valores,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      datalabels: {
        anchor: "center",  // Colocar o número no meio da barra
        align: "center",   // Alinhar o número dentro da barra
        color: "#000",     // Cor do número
        formatter: (value) => value,
        clip: false,       // Evitar que o rótulo seja cortado
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        title: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        title: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "203px", overflowX: "auto" }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );

}

export default GraficosAcoesEstrategia;
