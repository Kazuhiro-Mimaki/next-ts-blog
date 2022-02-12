import Image from "next/image";
import styles from "./resume.module.css";
import { DefinitionItemComponent } from "../../components/componentProvider";
import { basicInfoList } from "../../constants/basic-info";

const Resume = () => {
  return (
    <div className={styles.container}>
      <div className={styles["section-title"]}>
        <h2 className={styles.title}>RESUME</h2>
        <p className={styles.memo}>基本情報・経歴など</p>
      </div>
      <div className={styles["basic-info"]}>
        <div className={styles.left}>
          <Image src={`/icon.png`} alt="Icon" width={300} height={300} />
        </div>
        <div className={styles.right}>
          {basicInfoList.map((basicInfo, index) => {
            return (
              <DefinitionItemComponent
                key={index}
                term={basicInfo.term}
                description={basicInfo.description}
              />
            );
          })}
        </div>
      </div>
      <main className={styles.main}></main>
    </div>
  );
};

export default Resume;
