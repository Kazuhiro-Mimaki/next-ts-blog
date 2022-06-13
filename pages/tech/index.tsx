import zennFeedPosts from "../../_feed/_zenn/posts.json";
import style from "../../styles/tech-index.module.css";
import { GetStaticProps } from "next";
import axios, { AxiosResponse } from "axios";
import { IQiitaAPIPost, QiitaPost } from "../../models/qiitaPost";
import {
  NavHeadComponent,
  QiitaSectionComponent,
  ZennSectionComponent,
} from "../../components/componentProvider";
import { IZennFeedPost, ZennPost } from "../../models/zennPost";
import { useState, VFC } from "react";

// ====================
// Props
// ====================

type Props = {
  qiitaApiPosts: IQiitaAPIPost[];
  zennFeedPosts: IZennFeedPost[];
};

// ====================
// Enum
// ====================

enum TAB {
  Qiita,
  Zenn,
}

// ====================
// Page
// ====================

const TechPage: VFC<Props> = ({ qiitaApiPosts, zennFeedPosts }) => {
  const qiitaPosts = qiitaApiPosts.map((post) => new QiitaPost(post));
  const zennPosts = zennFeedPosts.map((post) => new ZennPost(post));

  const [currentTab, setCurrentTab] = useState(TAB.Qiita);

  const tabs = [
    { service: "Qiita", type: TAB.Qiita },
    { service: "Zenn", type: TAB.Zenn },
  ];

  const contents = (tab: TAB) => {
    switch (tab) {
      case TAB.Qiita:
        return <QiitaSectionComponent posts={qiitaPosts} />;
      case TAB.Zenn:
        return <ZennSectionComponent posts={zennPosts} />;
    }
  };

  return (
    <>
      <div className={style.container}>
        <div className={style["nav-head"]}>
          <NavHeadComponent
            title="Tech"
            sub="技術関連"
            borderColor="#ff5161"
            shadowColor="#d30302"
          />
        </div>

        {/* タブ */}
        <div className={style.tabs}>
          {tabs.map((tab, index) => {
            return (
              <div
                className={`${style.tab} ${
                  tabs[index].type === currentTab && style["current-tab"]
                }`}
                key={index}
                onClick={() => setCurrentTab(tab.type)}
              >
                {tab.service}
              </div>
            );
          })}
        </div>

        {/* タブに応じて内容を切り替え */}
        {contents(currentTab)}
      </div>
    </>
  );
};

// ====================
// getStaticProps
// ====================

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props;
}> => {
  const PAGE_NUMBER = 1;
  const PER_PAGE = 50;
  const res: AxiosResponse<IQiitaAPIPost[], IQiitaAPIPost[]> = await axios.get(
    `https://qiita.com/api/v2/authenticated_user/items?page=${PAGE_NUMBER}&per_page=${PER_PAGE}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.QIITA_API_TOKEN}`,
      },
    }
  );
  const qiitaApiPosts = res.data;

  return {
    props: {
      qiitaApiPosts,
      zennFeedPosts,
    },
  };
};

// ====================
// export
// ====================

export default TechPage;
