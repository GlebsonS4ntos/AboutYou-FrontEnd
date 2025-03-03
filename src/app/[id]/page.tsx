"use client";

import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import Header from "@/components/aboutpage/header";
import Content from "@/components/aboutpage/content";
import { Information } from '@/types';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const route = useRouter();
  const [infoData, setInfoData] = useState<Information | null>(null);
  const [loading, setLoading] = useState(true);
  const paramsId = use(params);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    const getInformation = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/information/${paramsId.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setInfoData(data);
          setLoading(false);
        } else {
          route.push("/notfound");
        }
      } catch (error) {
        console.log(error);
        route.push("/");
      }
    };
    getInformation();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
        <Loader className="animate-spin text-white w-8 h-8" /> :
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full min-h-screen bg-gray-800">
        {isMobile ? (
          <></>
        ) : (
          <div className="flex items-center justify-center w-1/2 min-h-screen">
            <Header
              infoData={infoData}
              imgHeight={256}
              imgWidth={256}
              textSize="text-4xl"
              isMobile={isMobile}
            />
          </div>
        )}
        <div
          className={`flex justify-center flex-col ${
            isMobile ? "w-full" : "w-1/2"
          }`}
        >
          {!isMobile ? (
            ""
          ) : (
            <Header
              infoData={infoData}
              imgHeight={128}
              imgWidth={128}
              textSize="text-2xl"
              isMobile={isMobile}
            />
          )}
          <Content infoData={infoData}/>
        </div>
      </div>
    </>
  );
}
