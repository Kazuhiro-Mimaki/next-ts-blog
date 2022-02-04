import { FeedItem } from "../../../types/feed-item/feedItem";
import styles from "./LinkButton.module.css";

type Props = {
  link: FeedItem["link"];
  message: string;
};

const LinkButton = ({ link, message }: Props) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <button className={styles.button}>{message}</button>
    </a>
  );
};

export default LinkButton;
