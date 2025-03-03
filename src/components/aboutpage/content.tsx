import { Information } from "@/types";
import { Typewriter } from "react-simple-typewriter";
import { Facebook, Github, Instagram, Linkedin, Mail, Phone } from "lucide-react";

export default function Content({
  infoData,
}: {
  infoData: Information | null;
}) {
  return (
    <div className="flex flex-col items-center justify-center font-mono p-4">
      {infoData ? (
        <Typewriter
          words={[`"${infoData?.description}"`]}
          loop={1}
          cursor={true}
          cursorStyle=""
          typeSpeed={20}
          delaySpeed={100}
        />
      ) : (
        <></>
      )}

      <div className="flex items-center justify-center gap-4 mt-10">
        <a href={`mailto:${infoData?.email}`} target="_blank">
          <Mail className="w-8 h-8 text-red-500" />
        </a>

        {infoData?.linkedlnUrl !== "" ? (
          <a href={infoData?.linkedlnUrl} target="_blank">
            <Linkedin className="w-8 h-8 text-red-500" />
          </a>
        ) : (
          <></>
        )}

{infoData?.instagramUrl !== "" ? (
          <a href={infoData?.instagramUrl} target="_blank">
            <Instagram className="w-8 h-8 text-red-500" />
          </a>
        ) : (
          <></>
        )}

{infoData?.facebookUrl !== "" ? (
          <a href={infoData?.facebookUrl} target="_blank">
            <Facebook className="w-8 h-8 text-red-500" />
          </a>
        ) : (
          <></>
        )}

{infoData?.whatsapp !== "" ? (
          <a href={`https://wa.me/${infoData?.whatsapp}`} target="_blank">
            <Phone className="w-8 h-8 text-red-500" />
          </a>
        ) : (
          <></>
        )}

{infoData?.githubUrl !== "" ? (
          <a href={infoData?.githubUrl} target="_blank">
            <Github className="w-8 h-8 text-red-500" />
          </a>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
