import styles from "./resume.module.css";
import { DefinitionItemComponent } from "../../components/componentProvider";
import {
  basicInfoList,
  skills,
  links,
  experiences,
} from "../../constants/constantProvider";

const Resume = () => {
  return (
    <div className={styles.container}>
      <div className={styles["page-title"]}>
        <h2 className={styles.title}>RESUME</h2>
        <p className={styles.memo}>基本情報・経歴など</p>
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
        <h2 className={styles.title}>Skill</h2>
      </div>
      <section className={styles["section"]}>
        <ul className={styles.skills}>
          {skills.map((skill, index) => {
            return (
              <li className={styles["list-item"]} key={index}>
                - {skill}
              </li>
            );
          })}
        </ul>
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
