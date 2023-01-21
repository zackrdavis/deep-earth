import type { NextPage, GetStaticProps } from "next";
import parse from "html-react-parser";
import { Footer } from "../components/Footer";
import { Logo } from "../components/Logo";
import { TwoColWrap, TextStack, AboveTextSpacer } from "../components/shared";
import { ImageStack } from "../components/ImageStack";
import { VerticalRule } from "../components/VerticalRule";

interface Props {
  content: {
    attributes: {
      featured_image: string;
    };
    html: string;
  };
}

const Contact: NextPage<Props> = ({ content }) => {
  const imageUrl = content.attributes.featured_image;

  return (
    <>
      <VerticalRule />

      <TwoColWrap>
        <TextStack isProjectText>
          <Logo />
          <AboveTextSpacer isProjectText />
          {parse(content.html)}
        </TextStack>

        <ImageStack images={[{ image: imageUrl }]} />
      </TwoColWrap>

      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await import(`../content/pages/${"contact"}.md`);
  return { props: { content: content.default } };
};

export default Contact;
