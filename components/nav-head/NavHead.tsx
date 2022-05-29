import style from "./NavHead.module.css";

type Props = {
  title: string;
  sub: string;
};

const NavHead = ({ title, sub }: Props) => {
  return (
    <>
      <h2 className={style.title}>{title}</h2>
      <p className={style.sub}>{sub}</p>
    </>
  );
};

export default NavHead;
