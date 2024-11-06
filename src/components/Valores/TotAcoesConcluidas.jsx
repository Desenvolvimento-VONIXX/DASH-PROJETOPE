import React, { useEffect, useState } from "react";
import { useConsultar } from "../../../hook/useConsultar";
import Snipper from "../Snipper";

function TotAcoesConcluidas() {

    const [result, setResult] = useState(0);
    const [consulta, setConsulta] = useState("");

    useEffect(() => {
        const novaConsulta = `
        SELECT 
        ROUND((CAST(COUNT(CASE WHEN STATUS = 'CONCLUIDO' THEN 1 END) AS FLOAT) / CAST(COUNT(*) AS FLOAT)) * 100, 2) AS PERCENTUAL_CONCLUIDO
        FROM SANKHYA.AD_PROJETOPE;
        `
        setConsulta(novaConsulta)
    })

    
    const { data, loading, error } = useConsultar(consulta);

    const getResult = async (data) => {
        if (data && data.length > 0) {
            const valor = data[0]?.PERCENTUAL_CONCLUIDO || 0;
            setResult(valor);
        }
    };

    useEffect(() => {
        getResult(data);
    }, [data]);

    if (loading) {
        return (
            <Snipper />
        )
    }

    if (error) return <div><p className="font-bold text-white text-[25px]">Error</p></div>;


    return(
        <p className="font-bold text-2xl text-gray-700">{result}%</p>
    );
}

export default TotAcoesConcluidas;