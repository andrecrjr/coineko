import catSvg from "./cat.svg";
import Image from "next/image";

export default function Cat({
  className,
  alt,
}: {
  className: string;
  alt: string;
}) {
  return (
    <Image
      src={require("./cat.svg")}
      alt={alt}
      loading="eager"
      className={className}
    />
  );
}
