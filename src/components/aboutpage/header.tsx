import TitleAnimated from "@/components/initialPage/TitleAnimated";
import { Information } from "@/types";

export default function Header({
  infoData,
  textSize,
  imgWidth,
  imgHeight,
  isMobile,
}: {
  infoData: Information | null;
  textSize: string;
  imgWidth: number;
  imgHeight: number;
  isMobile: boolean;
}) {
  return (
    <div className={`w-full ${isMobile ? "" : "h-1/2"}`}>
      {infoData ? (
        <>
          <div
            className={`${
              isMobile ? "flex flex-row" : "flex flex-col"
            } items-center justify-center gap-12`}
          >
            <div className={`${isMobile ? "w-1/2" : "w-xs"}`}>
              <TitleAnimated
                words={[infoData?.name, infoData?.profession, infoData?.name]}
                cursor={true}
                loop={1}
                cursorStyle=""
                deleteSpeed={20}
                typeSpeed={40}
                fontSize={textSize}
              />
            </div>
            <div
              style={{ width: `${imgWidth}px`, height: `${imgHeight}px` }}
              className="mb-4 rounded-full overflow-hidden flex justify-center items-center w-1/2"
            >
              <img
                src={infoData?.imageUrl}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
