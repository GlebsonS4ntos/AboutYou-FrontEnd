"use client";

import { useState, useEffect } from "react";
import ModalForm from "../form/modalForm";
import CopyButton from "../form/copyButton";
import Footer from "../footer/footer";
import Logo from "./Logo";
import TitleAnimated from "./TitleAnimated";

export default function AboutContainer() {
  const [showModal, setShowModal] = useState(false);
  const [infoId, setInfoId] = useState("");
  const [showLogoAnimate, setShowLogoAnimate] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowLogoAnimate(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const words = ["Compartilhe Sua História", "Fale Sobre Você", "About You"];

  return (
    <div className="h-full w-full relative flex flex-col items-center justify-between overflow-hidden space-y-4">
      <div className={`m-10 flex ${showLogoAnimate ? "justify-between" : "justify-center"}  items-center w-full max-w-4xl`}>
        {/* Container do Logo - metade esquerda */}
      <div className={`${showLogoAnimate? "w-1/2 flex justify-center items-center ":""} h-24`}>
          <Logo width={100} height={90} />
        </div>

        {/* Container do Texto Animado - metade direita */}
        {showLogoAnimate ? (
          <div className="w-1/2 overflow-hidden">
            <TitleAnimated
              words={words}
              cursor={true}
              loop={1}
              cursorStyle="_"
              deleteSpeed={20}
              typeSpeed={40}
              fontSize="text-xl"
            />
          </div>
        ) : null}
      </div>

      <div
        className="animate-bounce font-mono text-2xl border-dashed border-2 border-gray-500 p-5 hover:bg-gray-700 hover:border-red-500 cursor-pointer text-white text-center"
        onClick={() => setShowModal(true)}
      >
        <h1>Crie seu About You {"❤️"} </h1>
      </div>
      {infoId !== "" && (
        <div className="flex justify-center items-center border-dashed border-2 p-2 w-fit border-red-500">
          <CopyButton infoId={infoId} className="!px-2 !py-1 text-sm" />
        </div>
      )}

      <Footer />
      <ModalForm
        showForm={showModal}
        closeForm={() => setShowModal(false)}
        infoId={setInfoId}
      />
    </div>
  );
}
