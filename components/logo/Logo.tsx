import Image from "next/image";

type Props = {
  name: string;
  width: number;
  height: number;
};

const Logo = ({ name, width, height }: Props) => {
  return (
    <Image
      src={`/${name}.svg`}
      alt={`${name} Logo`}
      width={width}
      height={height}
    />
  );
};

export default Logo;
