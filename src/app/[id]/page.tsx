"use client";

import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

interface Information {
  id: string;
  profession: string;
  name: string;
  description: string;
  imageUrl: string;
  linkedlnUrl: string;
  githubUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  whatsapp: string;
  email: string;
}

export default function Page({ params }: { params: Promise<{ id: string }>}) {
  const route = useRouter();
  const [infoData, setInfoData] = useState<Information | null>(null);
  const [loading, setLoading] = useState(true);
  const paramsId = use(params);

  useEffect(() => {
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
            <Loader className="animate-spin text-white w-8 h-8"/> : 
        </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline"></h1>
    </>
  );
}
