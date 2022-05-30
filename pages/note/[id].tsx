import style from "../../styles/index.module.css";
import axios, { AxiosResponse } from "axios";
import {
  NavHeadComponent,
  PaginationComponent,
} from "../../components/componentProvider";
import { GetStaticPaths, GetStaticProps } from "next";

type NotePost = {
  id: string;
  name: string;
  body: string;
  hashtags: string[];
  noteUrl: string;
  likeCount: number;
};

type Props = {
  currentPageId: number;
  maxPageId: number;
  contents: NotePost[];
};

const NotePage = ({ currentPageId, maxPageId, contents }: Props) => {
  return (
    <>
      <div className={style.container}>
        <div className={style["section-title"]}>
          <NavHeadComponent title="Note" sub="日々のメモとか気づきとか" />
        </div>
        <div className={style.main}>
          {contents.map((content, index) => {
            return (
              <a
                className={style.card}
                href={content.noteUrl}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={style.icon}>
                  <img
                    src="http://www.google.com/s2/favicons?domain=note.com"
                    alt="note"
                    width={14}
                    height={14}
                  />
                  note.com
                </div>
                <p className={style["post-title"]}>{content.name}</p>
                <p>{content.body}</p>
              </a>
            );
          })}
        </div>
        <PaginationComponent
          currentPageId={currentPageId}
          maxPageId={maxPageId}
        />
      </div>
    </>
  );
};

type TResponse = {
  data: {
    contents: NotePost[];
    isLastPage: boolean;
    totalCount: number;
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const DEFAULT_PAGE_ID = 1;
  const PER_PAGE = 6;

  const res: AxiosResponse<TResponse> = await axios.get(
    `https://note.com/api/v2/creators/b1essk/contents?kind=note&page=${DEFAULT_PAGE_ID}`
  );
  const { totalCount } = res.data.data;

  const maxPageId = Math.ceil(totalCount / PER_PAGE);
  const paths: string[] = [];

  for (let i = 0; i <= maxPageId; i++) {
    paths.push(`/note/${i}`);
  }
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (
  ctx
): Promise<{ props: Props }> => {
  const DEFAULT_PAGE_ID = 1;
  const PER_PAGE = 6;
  const currentPageId = Number(ctx.params?.id) || DEFAULT_PAGE_ID;

  const res: AxiosResponse<TResponse> = await axios.get(
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
