import { useEffect, useState } from "react";

export const getWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") { // 윈도우 타입이 언디파인드가 아닐때 실행
      const handleResize = () => { 
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize); // 클린업
    } else {
      return;
    }
  }, []);
  return windowSize;
};