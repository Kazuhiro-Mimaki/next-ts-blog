import styles from "./Item.module.css";

type Props = {
  term: string;
  description: string;
  link?: string;
};

const DefinitionItem = ({ term, description, link }: Props) => {
  return (
    <dl className={styles.container}>
      <dt className={styles.term}>{term}</dt>
      {link ? (
        <a
          className={styles.link}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <dd>{description}</dd>
        </a>
      ) : (
        <dd>{description}</dd>
      )}
    </dl>
  );
};

export default DefinitionItem;
