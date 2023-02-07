import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { colors } from "./shared";

const BlurWrap = styled.div`
  img {
    width: 100%;
    height: 100%;
    background-color: ${colors.green};
    filter: none;
    transition: 0.1s filter linear;
  }
`;

export const BlurUpImg = ({
  src,
  alt,
  smQuery,
  lgQuery,
  className,
}: {
  src: string;
  alt: string;
  smQuery: string;
  lgQuery: string;
  className?: string;
}) => {
  const loadedFullSize = useRef(false);
  const [actualSrc, setActualSrc] = useState(src + smQuery);
  const [blur, setBlur] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoadSrc = () => {
    console.log("load");

    if (!loadedFullSize.current) {
      // if we just loaded the lo-rez image, switch to hi-rez
      // and flip the switch so we don't do it again
      setActualSrc(src + lgQuery);
      loadedFullSize.current = true;
    } else {
      // if we've loaded the hi-rez image, remove the blur
      setBlur(false);
    }
  };

  useEffect(() => {
    if (imgRef.current?.complete) {
      handleLoadSrc();
    }
  }, []);

  return (
    <BlurWrap className={className}>
      <img
        ref={imgRef}
        alt={alt}
        src={actualSrc}
        onLoad={handleLoadSrc}
        style={blur ? { filter: "blur(5px)" } : {}}
      />
    </BlurWrap>
  );
};
