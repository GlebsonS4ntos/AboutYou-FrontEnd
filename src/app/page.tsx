'use client';

import AboutContainer from "../components/initialPage/AboutContainer";
import BannerContainer from "../components/initialPage/BannerContainer";
import { useEffect, useState } from "react";

export default function Home() {
  const [showLogoAnimate, setShowLogoAnimate] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowLogoAnimate(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen w-screen">
      {showLogoAnimate && (
        <div className="w-1/2 bg-gray-900">
          <BannerContainer />
        </div>
      )}
      <div className={`${showLogoAnimate ? "w-1/2" : "w-full"} bg-gray-800`}>
        <AboutContainer />
      </div>
    </div>
  );
}
