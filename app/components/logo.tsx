"use client";

import Image from "next/image";

type LogoProps = {
  src: string;
};

export default function Logo({ src }: LogoProps) {
  return <Image src={src} alt="pyngme" width={32} height={32} priority />;
}
