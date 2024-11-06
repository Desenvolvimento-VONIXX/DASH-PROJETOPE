import React, { useState } from "react";
import TableAcoes from "../Table/TableAcoes";
import TotAcaoPorEstrategia from "../Valores/TotAcaoPorEstrategia";
import PercAcaoConclusaoEstrategia from "../Valores/PercAcaoConclusaoEstrategia";

function AcoesEstrategicas() {
  return (
    <div className="grid">
      <div className="grid grid-cols-12 gap-4 p-2">
        {/*SO*/}
        <div className="col-span-6 bg-white text-center p-[1px] rounded-[10px] shadow-lg">
          <div className="grid grid-cols-12 ">
            <div className="col-span-4 bg-[#78CFA9] text-center m-2 p-2 rounded-[20px] shadow-lg h-[10vh]">
              <h1 className="font-bold text-white">Nº de Ações</h1>
              <TotAcaoPorEstrategia estrategia={"SO"}/>
            </div>
            <div className="col-span-4 bg-[#78CFA9] text-center  m-2 p-2 rounded-[20px] shadow-lg h-[10vh]">
              <h1 className="font-bold text-white">Estratégia</h1>
              <p className="font-bold text-white text-[25px]">SO</p>
            </div>
            <div className="col-span-4 bg-[#78CFA9] text-center  m-2 p-2 rounded-[20px] shadow-lg h-[10vh]">
              <h1 className="font-bold text-white">Conclusão</h1>
              <PercAcaoConclusaoEstrategia estrategia={"SO"} />
            </div>
          </div>
          <div className="grid-cols-12 ">
            <TableAcoes className="w-[100%]" color={"#78CFA9"} estrategia={"SO"} />
          </div>
        </div>

        {/*WO*/}
        <div className="col-span-6 bg-white text-center p-[1px] rounded-[10px] shadow-lg">
          <div className="grid grid-cols-12 ">
            <div className="col-span-4 bg-[#78CFC6] text-center m-2 p-2 rounded-[20px] shadow-lg h-[10vh]">
              <h1 className="font-bold text-white">Nº de Ações</h1>
              <TotAcaoPorEstrategia estrategia={"WO"} />
            </div>
            <div className="col-span-4 bg-[#78CFC6] text-center  m-2 p-2 rounded-[20px] shadow-lg h-[10vh]">
              <h1 className="font-bold text-white">Estratégia</h1>
              <p className="font-bold text-white text-[25px]">WO</p>
            </div>
            <div className="col-span-4 bg-[#78CFC6] text-center  m-2 p-2 rounded-[20px] shadow-lg h-[10vh]">
              <h1 className="font-bold text-white">Conclusão</h1>
              <PercAcaoConclusaoEstrategia estrategia={"WO"} />

            </div>
          </div>
          <div className="grid-cols-12 ">
            <TableAcoes className="w-[100%]" color={"#78CFC6"} estrategia={"WO"}/>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 p-2">
        {/*ST*/}
        <div className="col-span-6 bg-white text-center p-[1px] rounded-[10px] shadow-lg">
          <div className="grid grid-cols-12 ">
            <div className="col-span-4 bg-[#FADC6A] text-center m-2 p-2 rounded-[20px] shadow-lg">
              <h1 className="font-bold text-white">Nº de Ações</h1>
              <TotAcaoPorEstrategia estrategia={"ST"} />
            </div>
            <div className="col-span-4 bg-[#FADC6A] text-center  m-2 p-2 rounded-[20px] shadow-lg">
              <h1 className="font-bold text-white">Estratégia</h1>
              <p className="font-bold text-white text-[25px]">ST</p>
            </div>
            <div className="col-span-4 bg-[#FADC6A] text-center  m-2 p-2 rounded-[20px] shadow-lg">
              <h1 className="font-bold text-white">Conclusão</h1>
              <PercAcaoConclusaoEstrategia estrategia={"ST"} />

            </div>
          </div>
          <div className="grid-cols-12 ">
            <TableAcoes className="w-[100%]" color={"#FADC6A"} estrategia={"ST"}/>
          </div>
        </div>

        {/*WT*/}
        <div className="col-span-6 bg-white text-center p-[1px] rounded-[10px] shadow-lg">
          <div className="grid grid-cols-12 ">
            <div className="col-span-4 bg-[#FDB3A2] text-center m-2 p-2 rounded-[20px] shadow-lg h-[10vh]">
              <h1 className="font-bold text-white">Nº de Ações</h1>
              <TotAcaoPorEstrategia estrategia={"WT"} />
            </div>
            <div className="col-span-4 bg-[#FDB3A2] text-center  m-2 p-2 rounded-[20px] shadow-lg h-[10vh]">
              <h1 className="font-bold text-white">Estratégia</h1>
              <p className="font-bold text-white text-[25px]">WT</p>
            </div>
            <div className="col-span-4 bg-[#FDB3A2] text-center  m-2 p-2 rounded-[20px] shadow-lg h-[10vh]">
              <h1 className="font-bold text-white">Conclusão</h1>
              <PercAcaoConclusaoEstrategia estrategia={"WT"} />
            </div>
          </div>
          <div className="grid-cols-12 ">
            <TableAcoes className="w-[100%]" color={"#FDB3A2"} estrategia={"WT"}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcoesEstrategicas;
