import Image from "next/image";

type Props = {
  head: string;
};

const Logo = ({ head }: Props) => {
  return (
    <Image src={`/${head}.svg`} alt={`${head} Logo`} width={20} height={20} />
  );
};

export default Logo;
