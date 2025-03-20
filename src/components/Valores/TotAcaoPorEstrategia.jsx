import React, { useEffect, useState } from "react";
import { useConsultar } from "../../../hook/useConsultar";
import Snipper from "../Snipper";

function TotAcaoPorEstrategia({estrategia}) {

    const [result, setResult] = useState(0);
    const [consulta, setConsulta] = useState("");

    useEffect(() => {
        const novaConsulta = `
        SELECT COUNT(*) AS TOTAL_ACAO FROM SANKHYA.AD_PROJETOPE WHERE ESTRATEGIA = '${estrategia}' AND YEAR(DT_INICIO_PANEJAMENTO)= ${P_ANO}
        `
        setConsulta(novaConsulta)
    })

    const { data, loading, error } = useConsultar(consulta);

    const getTotAcao = async (data) => {
        if (data && data.length > 0) {
            const valor = data[0]?.TOTAL_ACAO || 0;
            setResult(valor);
        }
    };

    useEffect(() => {
        getTotAcao(data);
    }, [data]);

    if (loading) {
        return (
            <Snipper />
        )
    }

    if (error) return <div><p className="font-bold text-white text-[25px]">Error</p></div>;


    return(
        <p className="font-bold text-white text-[25px]">{result}</p>
    );
}

export default TotAcaoPorEstrategia;