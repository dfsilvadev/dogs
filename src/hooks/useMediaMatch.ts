import { useEffect, useState } from "react";

export const useMediaMatch = (screenValue: string) => {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    function changeMatch() {
      const { matches } = matchMedia(screenValue);
      setMatch(matches);
    }

    changeMatch();
    window.addEventListener("resize", changeMatch);

    return () => {
      window.removeEventListener("resize", changeMatch);
    };
  }, [screenValue]);

  return { match };
};
