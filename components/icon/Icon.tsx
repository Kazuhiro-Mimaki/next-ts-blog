import style from "./Icon.module.css";

type Props = {
  name: string;
};

const Icon = ({ name }: Props) => {
  return (
    <div className={style.icon}>
      <img
        src={`http://www.google.com/s2/favicons?domain=${name}`}
        alt={name}
        width={14}
        height={14}
      />
      {name}
    </div>
  );
};

export default Icon;
