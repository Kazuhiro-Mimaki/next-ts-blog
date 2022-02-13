import Image from "next/image";
import styles from "./resume.module.css";
import { DefinitionItemComponent } from "../../components/componentProvider";
import { basicInfoList, skills } from "../../constants/constantProvider";

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
        <h2 className={styles.title}>Skill</h2>
      </div>
      <section className={styles["section"]}>
        <ul className={styles.skills}>
          <li>- JavaScript</li>
          <li>- TypeScript</li>
          <li>- Vue.js, Nuxt.js</li>
          <li>- Python</li>
          <li>- Flask</li>
          <li>- MySQL</li>
          <li>- Docker</li>
          <li>
            - AWS (EC2, S3, CloudFront, API Gateway, ELB, ECS, Lambda, RDS)
          </li>
        </ul>
      </section>
      <div className={styles["section-title"]}>
        <h2 className={styles.title}>Experience</h2>
      </div>
      <section className={styles["section"]}>
        <ul className={styles.skills}>
          <li>2020.05- : Work at HIBRO, as a part time job (HTML/CSS, Vue.js)</li>
          <li>2020.06- : Work at vook, as a part time job (Ruby on Rails)</li>
          <li>2021.04- : Work at irep, as a full-time (Nuxt.js, Flask, AWS)</li>
        </ul>
      </section>
    </div>
  );
};

export default Resume;
