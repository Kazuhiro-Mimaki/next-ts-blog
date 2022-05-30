import Link from "next/link";
import style from "./Pagination.module.css";

type Props = {
  maxPageId: number;
  currentPageId: number;
};

const Pagination = ({ maxPageId, currentPageId }: Props) => {
  const DEFAULT_PAGE_ID = 1;
  const prevPageId = currentPageId - 1;
  const nextPageId = currentPageId + 1;

  return (
    <div className={style.container}>
      {currentPageId !== DEFAULT_PAGE_ID && (
        <Link href={`/note/${prevPageId}`}>
          <a className={style["paginate-btn"]}>&lt; Previous</a>
        </Link>
      )}
      {currentPageId !== maxPageId && (
        <Link href={`/note/${nextPageId}`}>
          <a className={`${style["paginate-btn"]} ${style.next}`}>Next &gt;</a>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
