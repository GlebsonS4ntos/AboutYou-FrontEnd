import TitleAnimated from "./TitleAnimated";
import Logo from "./Logo";

export default function BannerContainer() {
  const words = [
    "Compartilhe Sua História",
    "Fale Sobre Você",
    "About You",
  ];

  return (
    <section className="relative flex flex-col h-screen w-full items-center justify-center bg-gray-900 pt-10">
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
        <Logo width={100} height={90} />
      </div>

      <TitleAnimated
        words={words}
        cursor={true}
        loop={1}
        cursorStyle="_"
        deleteSpeed={20}
        typeSpeed={40}
        fontSize="text-4xl"
      />
    </section>
  );
}
