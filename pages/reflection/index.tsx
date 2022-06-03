import axios, { AxiosResponse } from "axios";
import { GetStaticProps } from "next";
import { VFC } from "react";
import { NavHeadComponent } from "../../components/componentProvider";
import { NotePost } from "../../models/notePost";
import style from "./reflection.module.css";

type Props = {
  monthlyReports: NotePost[];
};

const ReflectionPage: VFC<Props> = ({ monthlyReports }) => {
  return (
    <>
      <div className={style.container}>
        <div className={style["section-title"]}>
          <NavHeadComponent title="Reflection" sub="月次振り返り" />
        </div>

        {monthlyReports.map((post, index) => {
          return (
            <a
              className={style.card}
              href={post.noteUrl}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className={style["post-title"]}>{post.name}</p>
            </a>
          );
        })}
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

export const getStaticProps: GetStaticProps = async (): Promise<any> => {
  const PREFIX = "Monthly Reports";
  const monthlyReports: NotePost[] = [];
  let pageId = 1;

  while (true) {
    const res: AxiosResponse<TResponse> = await axios.get(
      `https://note.com/api/v2/creators/b1essk/contents?kind=note&page=${pageId}`
    );
    const { contents, isLastPage } = res.data.data;
    contents.map((content) => {
      if (content.name.includes(PREFIX)) {
        monthlyReports.push(content);
      }
    });
    if (isLastPage) {
      break;
    }
    pageId++;
  }

  return {
    props: {
      monthlyReports,
    },
  };
};

export default ReflectionPage;
