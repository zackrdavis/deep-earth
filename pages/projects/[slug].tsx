import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import path from "path";
import parse from "html-react-parser";

interface Props {
  content: {
    attributes: {
      featured_image: string;
    };
    html: string;
  };
}

const SingleProject: NextPage<Props> = ({ content }) => {
  return <>{parse(content.html)}</>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fs
    .readdirSync(path.join(process.cwd(), "content/projects"))
    .map((projectFile) => {
      const trimmedName = projectFile.substring(0, projectFile.length - 3);

      return {
        params: { slug: trimmedName },
      };
    });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = await import(
    `../../content/projects/${params?.slug}.md`
  ).catch(() => null);

  return { props: { content: project.default } };
};

export default SingleProject;
