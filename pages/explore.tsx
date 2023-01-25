import type { NextPage, GetStaticProps } from "next";
import { useState, useRef } from "react";
import { Footer } from "../components/Footer";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  colors,
  ContentWrap,
  dims,
  TwoColWrap,
  TextStack,
} from "../components/shared";
import { VerticalRule } from "../components/VerticalRule";
import { Logo } from "../components/Logo";

export type Plant = {
  attributes: {
    title: string;
    image: string;
  };
  slug: string;
};

const PlantsGrid = styled.div`
  display: grid;
  grid-gap: var(--margin-med);
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  margin-bottom: ${dims.footerHeight}px;
  margin-top: ${dims.betweenLogoAndGrid}px;
`;

const StyledPlantHoverTile = styled(Link)`
  aspect-ratio: 1;
  min-width: 100px;
  min-height: 100px;
  cursor: pointer;
  position: relative;

  img {
    width: 90%;
    height: 90%;
    border-radius: 666px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    box-shadow: 0 0 0 1px ${colors.black};
  }
`;

const PlantHoverTile = ({
  plant,
  onHoverPlant,
}: {
  plant: Plant;
  onHoverPlant: (plant?: Plant) => void;
}) => {
  const {
    attributes: { title, image },
    slug,
  } = plant;

  return (
    <StyledPlantHoverTile
      href={`/projects?plant=${slug}`}
      onMouseEnter={() => onHoverPlant(plant)}
    >
      {/* {title} */}
      <img src={image} />
    </StyledPlantHoverTile>
  );
};

const PlantPic = styled.img`
  position: fixed;
  width: 50%;
  height: calc(100% - ${dims.footerHeight * 2}px);
  top: 0;
  right: 0;
  object-fit: cover;
`;

const PlantFooter = styled.div`
  border-top: 1px solid ${colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 0;
  bottom: ${dims.footerHeight}px;
  width: 50%;
  height: ${dims.footerHeight}px;
  padding: 0 ${dims.xPad}px;
  background: ${colors.tan};

  @media screen and (max-width: 640px) {
    bottom: 0;
  }
`;

interface Props {
  plantsList: Plant[];
}

const Plants: NextPage<Props> = ({ plantsList }) => {
  const { query } = useRouter();
  const plantQuery = query.plant as string;
  const queriedPlant = plantsList.find((plant) => plant.slug == plantQuery);

  const [currentPlant, setCurrentPlant] = useState<undefined | Plant>(
    queriedPlant
  );

  useEffect(() => {
    setCurrentPlant(queriedPlant);
  }, [queriedPlant]);

  return (
    <>
      <VerticalRule />

      <TwoColWrap>
        <TextStack>
          <Logo />
          <PlantsGrid>
            {plantsList.map((plant, i) => (
              <PlantHoverTile plant={plant} onHoverPlant={setCurrentPlant} />
            ))}
          </PlantsGrid>
        </TextStack>

        {currentPlant && (
          <>
            <PlantPic src={currentPlant?.attributes.image} />
            <PlantFooter>{currentPlant?.attributes.title}</PlantFooter>
          </>
        )}
      </TwoColWrap>

      <Footer />

      {/* <MobileContentWrap
        style={{ paddingBottom: dims.footerHeight + dims.xPad - 24 }}
      >
        <Logo />
        <PlantColumns>
          {plantsList.map((plant, i) => (
            // <HoverPlant key={i} {...plant} />
          ))}
        </PlantColumns>
      </MobileContentWrap>
      <Footer /> */}
    </>
  );
};

export const importPlants = async () => {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context("/content/plants", false)
    .keys()
    .map((relativePath) => relativePath.substring(2));

  return Promise.all(
    markdownFiles.map(async (path) => {
      const markdown = await import(`../content/plants/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    })
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const plantsList = await importPlants();

  return { props: { plantsList } };
};

export default Plants;

// const HoverPlant = (plant: Plant) => {
//   const { query } = useRouter();
//   const plantQuery = query.plant as string;
//   const isQueried = plantQuery === plant.slug;
//   const { title, image } = plant.attributes;
//   const slug = plant.slug;
//   const scrollToRef = useRef<HTMLDivElement>(null);
//   const [hover, setHover] = useState(isQueried);

//   useEffect(() => {
//     if (isQueried) {
//       scrollToRef.current?.scrollIntoView();
//     }
//   }, []);

//   const randLeft = Math.random() * 100;
//   const randTop = Math.random() * 100;
//   const randPosStyle = {
//     top: `${randTop}%`,
//     left: `${randLeft}%`,
//     transform: `translate(${-randLeft}%, ${-randTop}%)`,
//   };

//   return (
//     <>
//       <PlantLink
//         ref={scrollToRef}
//         onMouseEnter={() => setHover(true)}
//         onMouseLeave={() => setHover(false)}
//         style={{ color: hover ? colors.sienna : "" }}
//       >
//         <Link href={`/projects?plant=${slug}`}>{title}</Link>
//       </PlantLink>
//       {hover && <PlantPic style={randPosStyle} src={`/${image}`} />}
//     </>
//   );
// };
