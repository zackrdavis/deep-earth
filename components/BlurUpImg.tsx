import { useEffect, useRef, useState } from "react";
import styled, { css, CSSProperties } from "styled-components";

const BlurWrap = styled.div<{ blur?: boolean }>`
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: var(--green);
    filter: none;
    transition: 0.1s filter linear;

    ${({ blur }) =>
      blur &&
      css`
        filter: blur(5px);
      `}
  }
`;

export const BlurUpImg = ({
  src,
  alt,
  smQuery = "?nf_resize=fit&w=100",
  lgQuery,
  className,
  style,
  lazy,
}: {
  src: string;
  alt: string;
  smQuery?: string;
  lgQuery: string;
  lazy?: boolean;
  style?: CSSProperties;
  className?: string;
}) => {
  const loadedFullSize = useRef(false);
  const [actualSrc, setActualSrc] = useState(src + smQuery);
  const [blur, setBlur] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoadSrc = () => {
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
    <BlurWrap className={className} blur={blur} style={style}>
      <img
        ref={imgRef}
        alt={alt}
        onLoad={handleLoadSrc}
        loading={lazy ? "lazy" : "eager"}
        src={actualSrc}
      />
    </BlurWrap>
  );
};
