import { Typewriter } from 'react-simple-typewriter';

interface TitleProps {
    words: string[],
    cursor: boolean,
    loop: number,
    cursorStyle: string,
    typeSpeed: number,
    deleteSpeed: number
    fontSize: string
}

export default function TitleAnimated({words, cursor, loop, cursorStyle, typeSpeed, deleteSpeed, fontSize}: TitleProps) {
    return (
        <h1 className={`${fontSize} font-bold text-white font-mono p-5`}>
          <Typewriter
            words={words}
            loop={loop}
            cursor= {cursor}
            cursorStyle={cursorStyle}
            typeSpeed={typeSpeed}
            deleteSpeed={deleteSpeed}
          />
      </h1>
    );
}