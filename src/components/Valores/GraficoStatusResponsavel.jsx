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
  registerables,
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importar plugin

// Registrando os componentes do gráfico
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Registrar o plugin
);

function GraficoStatusResponsavel() {
  const [result, setResult] = useState([]);
  const [consulta, setConsulta] = useState("");

  useEffect(() => {
    const novaConsulta = `
      SELECT 
        RESPONSAVEL AS RESPONSAVEL,
        CAST(
          CASE 
            WHEN COUNT(*) = 0 THEN 0 
            ELSE COUNT(CASE WHEN STATUS = 'CONCLUIDO' THEN 1 END) * 100.0 / COUNT(*) 
          END AS DECIMAL(10)
        ) AS PERCENTUAL_CONCLUSAO
      FROM 
        SANKHYA.AD_PROJETOPE 
      GROUP BY 
        RESPONSAVEL
      ORDER BY 
        PERCENTUAL_CONCLUSAO DESC
    `;
    setConsulta(novaConsulta);
  }, []);

  const { data, loading, error } = useConsultar(consulta);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      console.log("Dados retornados:", data); // Log dos dados para depuração
      const formattedData = data.map((item) => ({
        responsavel: item.RESPONSAVEL,
        qnt: item.PERCENTUAL_CONCLUSAO,
      }));
      setResult(formattedData);
    } else {
      console.log("Nenhum dado retornado ou formato incorreto:", data); // Log se não houver dados
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Snipper />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="font-bold text-white text-[25px]">Error</p>
      </div>
    );
  }

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
        label: "Percentual de Conclusão", 
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
    
      datalabels: {
        color: '#5e5c5c',
        anchor: 'center', 
        align: 'center',
        formatter: (value) => {
          return value.toFixed(2) + '%'; 
        },
        font: {
          size: 10,
          weight: 'bold',
        },
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

export default GraficoStatusResponsavel;
