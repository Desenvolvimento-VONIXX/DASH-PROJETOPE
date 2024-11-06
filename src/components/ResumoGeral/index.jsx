import React, { useState } from "react";
import TotAcaoEstrategicas from "../Valores/TotAcoesEstrategicas";
import TotAcoes from "../Valores/TotAcoes";
import TotAcoesConcluidas from "../Valores/TotAcoesConcluidas";
import GraficosAcoesEstrategia from "../Valores/GraficoAcoesEstrategia";
import GraficoStatusAndamento from "../Valores/GraficoStatusAndamento";
import GraficoAcaoResponsavel from "../Valores/GraficoAcaoResponsavel";
import GraficoStatusResponsavel from "../Valores/GraficoStatusResponsavel";

function ResumoGeral() {
  return (
    <div className="grid">
      <div className="grid grid-cols-12 gap-4 p-[2px] justify-items-center">
        {/* Card 1 */}
        <div className="col-span-4 bg-white text-center p-3 rounded-[10px] shadow-lg min-w-[50%] mx-auto">
          <h3 className="text-gray-800 font-bold text-[16px]">
            Ações Estratégicas
          </h3>
          <TotAcaoEstrategicas />
        </div>

        {/* Card 2 */}
        <div className="col-span-4 bg-white text-center p-3 rounded-[10px] shadow-lg min-w-[50%] mx-auto">
          <h3 className="text-gray-800 font-bold text-[16px]">
            Total de Ações
          </h3>
          <TotAcoes />
        </div>

        {/* Card 3 */}
        <div className="col-span-4 bg-white text-center p-3 rounded-[10px] shadow-lg min-w-[50%] mx-auto">
          <h3 className="text-gray-800 font-bold text-[16px]">Conclusão P.E</h3>
          <TotAcoesConcluidas />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-4 bg-white text-center p-3 rounded-[10px] shadow-lg">
          <h3 className="text-gray-800 font-bold text-[16px]">
            Ações por Estratégia
          </h3>
          <GraficosAcoesEstrategia />
        </div>

        <div className="col-span-4 row-span-11 bg-white text-center p-3 rounded-[10px] shadow-lg">
          <h3 className="text-gray-800 font-bold text-[16px]">
            Contagem de Ação por Responsável
          </h3>
          <GraficoAcaoResponsavel/>
        </div>
        <div className="col-span-4 row-span-11 bg-white text-center p-3 rounded-[10px] shadow-lg">
          <h3 className="text-gray-800 font-bold text-[16px]">
            Distribuição de Status por Responsável
          </h3>
          <GraficoStatusResponsavel/>
        </div>
        <div className="col-span-4 row-span-10 bg-white text-center p-3 rounded-[10px] shadow-lg">
          <h3 className="text-gray-800 font-bold text-[16px]">
            Status de Andamento - Geral
          </h3>
          <GraficoStatusAndamento />
        </div>
      </div>
    </div>
  );
}

export default ResumoGeral;
