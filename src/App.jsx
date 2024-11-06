import { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import ResumoGeral from "./components/ResumoGeral";
import AcoesEstrategicas from "./components/AcoesEstrategicas";
import "./index.css";

function App() {
  const [currentView, setCurrentView] = useState("resumoGeral");


  const handleNext = () => { 
    if (currentView === "resumoGeral") {
      setCurrentView("acoesEstrategicas");
    } else if(currentView === "acoesEstrategicas"){
      setCurrentView("resumoGeral")
    }
  };

  const handlePrevious = () => {
    if (currentView === "acoesEstrategicas") {
      setCurrentView("resumoGeral"); 
    }
  };

  return (
    <div className="p-5">
      <div className="nav relative w-full">
        
        <span className={`${currentView === "resumoGeral" ? "hidden" : ""} absolute left-0 bottom-0 shadow-lg`} onClick={handlePrevious}>
          <FaArrowAltCircleLeft className="text-white text-[50px] icon-arrow" />
        </span>
        <img src="/img/LogoPreto.png" className="logo shadow-lg" alt="Logo" />
        <span className={` ${currentView === "acoesEstrategicas" ? "hidden" : ""} absolute right-0 bottom-0 shadow-lg`} onClick={handleNext}>
          <FaArrowAltCircleRight className="text-white text-[50px] icon-arrow" />
        </span>
      </div>

      <div className="mt-[1%]">
        {currentView === "resumoGeral" && <ResumoGeral />}
        {currentView === "acoesEstrategicas" && <AcoesEstrategicas />}
      </div>
    </div>
  );
}

export default App;
