import React, { useEffect, useState } from "react";
import { useConsultar } from "../../../hook/useConsultar";
import Snipper from "../Snipper";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import 'chartjs-plugin-datalabels';

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
            GROUP BY STATUS        
            `;
    setConsulta(novaConsulta);
  }, []);

  const { data, loading, error } = useConsultar(consulta);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const formattedData = data.map((item) => ({
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

  const labels = resultValorMes.map(item => `${item.mes}/${item.ano}`);
  const valores = resultValorMes.map(item => item.totalValor);

  // Defina um valor máximo para o eixo Y (ajuste conforme necessário)
  const valorMaximo = Math.max(...valores) + (Math.max(...valores) * 0.1); // 10% a mais que o valor máximo

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Valor Total por Mês',
        data: valores,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.1,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(75,192,192,1)',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      datalabels: {
        display: true,
        align: 'end',
        anchor: 'end',
        rotation: -90,
        formatter: (value) => `R$ ${value.toLocaleString('pt-BR')}`,
        font: {
          weight: 'bold',
          size: 10,
        },
        color: '#000',
        offset: 4
      }
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
        display: false,
      },
      x: {
        grid: {
          display: false,
        },
      }
    }
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
      <Doughnut
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
}

export default GraficoStatusAndamento;
