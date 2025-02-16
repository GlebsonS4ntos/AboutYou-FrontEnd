import Image from "next/image";

interface LogoProps {
    width: number;
    height: number;
}


export default function Logo({width, height} : LogoProps) {
    return (
        <Image src="/aboutyou.png" alt="About You Logo" width={width} height={height}/>
    );
}