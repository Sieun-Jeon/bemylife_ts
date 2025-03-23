"use client";

//import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

interface ImageWithBackProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export default function ImageWithBack({ src, alt = "image", width = 600, height = 400 }: ImageWithBackProps) {
  //const router = useRouter();

  return (
    <div className="relative p-4">
      <button
        onClick={() => {
          // const currentParams = router.query;
          // router.push({
          //   pathname: router.pathname,
          //   query: { ...currentParams, isBack: true }
          // });
//          router.back()
        }}
        className="flex items-center gap-2 text-gray-700 hover:text-black transition mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>뒤로가기</span>
      </button>
    </div>
  );
}
