import React, { useEffect, useState } from "react";
import { useConsultar } from "../../../hook/useConsultar";
import Snipper from "../Snipper";

function PercAcaoConclusaoEstrategia({estrategia}) {

    const [result, setResult] = useState(0);
    const [consulta, setConsulta] = useState("");

    useEffect(() => {
        const novaConsulta = `
        SELECT TOP 1
        CAST(
        (SELECT COUNT(*) FROM SANKHYA.AD_PROJETOPE WHERE ESTRATEGIA = '${estrategia}' AND STATUS = 'CONCLUIDO') * 100.0 / 
        (SELECT COUNT(*) FROM SANKHYA.AD_PROJETOPE WHERE ESTRATEGIA = '${estrategia}')
        AS DECIMAL(10, 2)) AS PERCENTUAL_CONCLUSAO
        FROM SANKHYA.AD_PROJETOPE
        `
        setConsulta(novaConsulta)
    })
    
    const { data, loading, error } = useConsultar(consulta);

    const getResult = async (data) => {
        if (data && data.length > 0) {
            const valor = data[0]?.PERCENTUAL_CONCLUSAO || 0;
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
        <p className="font-bold text-white text-[25px]">{result}%</p>
    );
}

export default PercAcaoConclusaoEstrategia;