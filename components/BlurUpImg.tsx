import { useState } from "react";
import styled, { CSSProperties } from "styled-components";

const BlurWrap = styled.div<{ blur?: boolean }>`
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: var(--green);
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
  const [actualSrc, setActualSrc] = useState(src + smQuery);

  return (
    <BlurWrap className={className} style={style}>
      <img
        alt={alt}
        src={actualSrc}
        onLoad={() => setActualSrc(src + lgQuery)}
        loading={lazy ? "lazy" : "eager"}
      />
    </BlurWrap>
  );
};
