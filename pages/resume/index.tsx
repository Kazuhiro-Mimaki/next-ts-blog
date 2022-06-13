import styles from "./resume.module.css";
import {
  DefinitionItemComponent,
  NavHeadComponent,
} from "../../components/componentProvider";
import {
  basicInfoList,
  links,
  experiences,
} from "../../constants/constantProvider";

const Resume = () => {
  return (
    <div className={styles.container}>
      <div className={styles["page-title"]}>
        <NavHeadComponent
          title="Resume"
          sub="基本情報・経歴など"
          borderColor="#ffdb4e"
          shadowColor="#b48505"
        />
      </div>
      <div className={styles["section-title"]}>
        <h2 className={styles.title}>Basic info</h2>
      </div>
      <section className={styles["section"]}>
        {basicInfoList.map((basicInfo, index) => {
          return (
            <DefinitionItemComponent
              key={index}
              term={basicInfo.term}
              description={basicInfo.description}
            />
          );
        })}
      </section>
      <div className={styles["section-title"]}>
        <h2 className={styles.title}>Link</h2>
      </div>
      <section className={styles["section"]}>
        {links.map((link, index) => {
          return (
            <DefinitionItemComponent
              key={index}
              term={link.term}
              description={link.description}
              link={link.description}
            />
          );
        })}
      </section>
      <div className={styles["section-title"]}>
        <h2 className={styles.title}>Experience</h2>
      </div>
      <section className={styles["section"]}>
        <ul className={styles.experiences}>
          {experiences.map((experience, index) => {
            return (
              <li className={styles["list-item"]} key={index}>
                {experience}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default Resume;
