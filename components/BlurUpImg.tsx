import styled, { CSSProperties } from "styled-components";
import Image from "next/image";

const BlurWrap = styled.div<{ blur?: boolean }>`
  img {
    height: auto !important;
    position: relative !important;
  }
`;

export const BlurUpImg = ({
  src,
  alt,
  className,
  style,
}: {
  src: string;
  alt: string;
  style?: CSSProperties;
  className?: string;
}) => {
  return (
    <BlurWrap style={style} className={className}>
      <Image
        src={src}
        alt={alt}
        fill={true}
        placeholder="blur"
        blurDataURL={src + "?nf_resize=fit&w=100"}
        style={{ objectFit: "cover" }}
      />
    </BlurWrap>
  );
};
