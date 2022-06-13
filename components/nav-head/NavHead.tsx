import Image from "next/image";
import Link from "next/link";
import style from "./NavHead.module.css";

type Props = {
  title: string;
  sub: string;
  borderColor: string;
  shadowColor: string;
};

const NavHead = ({ title, sub, borderColor, shadowColor }: Props) => {
  const lowerTitle = title.toLowerCase();
  return (
    <div className={style.item}>
      <Link
        href={
          lowerTitle === "github"
            ? "https://github.com/Kazuhiro-Mimaki"
            : `/${lowerTitle}`
        }
      >
        <a
          className={`${style.circle}`}
          style={{
            border: `solid 2px ${borderColor}`,
            boxShadow: `0 0 100px 1px ${shadowColor}, 0 0 10px 1px ${shadowColor} inset`,
          }}
        >
          <Image
            className={style.icon}
            src={`/svg/${lowerTitle}.svg`}
            alt={lowerTitle}
            width={35}
            height={35}
          />
        </a>
      </Link>
      <div>
        <h2>{title}</h2>
        <p className={style.sub}>{sub}</p>
      </div>
    </div>
  );
};

export default NavHead;
