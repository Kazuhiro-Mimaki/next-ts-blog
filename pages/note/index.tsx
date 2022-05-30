import style from "../../styles/index.module.css";
import axios, { AxiosResponse } from "axios";
import { NavHeadComponent } from "../../components/componentProvider";

type NotePost = {
  id: string;
  name: string;
  body: string;
  hashtags: string[];
  noteUrl: string;
};

type Props = {
  contents: NotePost[];
};

const Index = ({ contents }: Props) => {
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

export async function getStaticProps() {
  const res: AxiosResponse<TResponse> = await axios.get(
    "https://note.com/api/v2/creators/b1essk/contents?kind=note&page=1"
  );
  const { contents, isLastPage, totalCount } = res.data.data;

  return {
    props: {
      contents,
    },
  };
}

export default Index;
