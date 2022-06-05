import style from "../../styles/index.module.css";
import axios, { AxiosResponse } from "axios";
import {
  IconComponent,
  NavHeadComponent,
  PaginationComponent,
} from "../../components/componentProvider";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  INoteAPIPost,
  INoteAPIResponse,
  NotePost,
} from "../../models/notePost";
import { VFC } from "react";

type Props = {
  currentPageId: number;
  maxPageId: number;
  contents: INoteAPIPost[];
};

const NotePage: VFC<Props> = ({ currentPageId, maxPageId, contents }) => {
  const notePosts = contents.map((content) => new NotePost(content));

  return (
    <>
      <div className={style.container}>
        <div className={style["nav-head"]}>
          <NavHeadComponent title="Note" sub="日々のメモとか気づきとか" />
        </div>

        {notePosts.map((content, index) => {
          return (
            <a
              className={style.post}
              href={content.noteUrl}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconComponent name="note.com" />
              <p className={style["post-title"]}>{content.name}</p>
              <p>{content.body}...</p>
            </a>
          );
        })}

        <PaginationComponent
          currentPageId={currentPageId}
          maxPageId={maxPageId}
        />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const DEFAULT_PAGE_ID = 1;
  const PER_PAGE = 6;

  const res: AxiosResponse<INoteAPIResponse> = await axios.get(
    `https://note.com/api/v2/creators/b1essk/contents?kind=note&page=${DEFAULT_PAGE_ID}`
  );
  const { totalCount } = res.data.data;

  const maxPageId = Math.ceil(totalCount / PER_PAGE);
  const paths: string[] = [];

  for (let i = 0; i <= maxPageId; i++) {
    paths.push(`/note/${i}`);
  }
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (
  ctx
): Promise<{ props: Props }> => {
  const DEFAULT_PAGE_ID = 1;
  const PER_PAGE = 6;
  const currentPageId = Number(ctx.params?.pageId) || DEFAULT_PAGE_ID;

  const res: AxiosResponse<INoteAPIResponse> = await axios.get(
    `https://note.com/api/v2/creators/b1essk/contents?kind=note&page=${currentPageId}`
  );
  const { contents, totalCount } = res.data.data;

  const maxPageId = Math.ceil(totalCount / PER_PAGE);

  return {
    props: {
      currentPageId,
      maxPageId,
      contents,
    },
  };
};

export default NotePage;
