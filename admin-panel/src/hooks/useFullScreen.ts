import { useCallback, useState, useEffect } from "react";
import fscreen from "fscreen";
const useFullScreen = function () {
  const [inFullscreenMode, setInFullscreenMode] = useState(false);

  const handleFullscreenChange = useCallback((e: any) => {
    let change = "";
    if (fscreen.fullscreenElement !== null) {
      change = "Entered fullscreen mode";
      setInFullscreenMode(true);
    } else {
      change = "Exited fullscreen mode";
      setInFullscreenMode(false);
    }
    console.log(change, e);
  }, []);
  const handleFullscreenError = useCallback((e: any) => {
    console.log("Fullscreen Error", e);
  }, []);

  useEffect(() => {
    if (fscreen.fullscreenEnabled) {
      fscreen.addEventListener(
        "fullscreenchange",
        handleFullscreenChange,
        false
      );
      fscreen.addEventListener("fullscreenerror", handleFullscreenError, false);
      return () => {
        fscreen.removeEventListener("fullscreenchange", handleFullscreenChange);
        fscreen.removeEventListener("fullscreenerror", handleFullscreenError);
      };
    }
  });
};

export default useFullScreen;
