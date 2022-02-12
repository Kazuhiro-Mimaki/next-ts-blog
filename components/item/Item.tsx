import styles from "./Item.module.css";

type Props = {
  term: string;
  description: string;
};

const DefinitionItem = ({ term, description }: Props) => {
  return (
    <dl className={styles.container}>
      <dt className={styles.term}>{term}</dt>
      <dd>{description}</dd>
    </dl>
  );
};

export default DefinitionItem;
