import * as React from "react";
import styles from "../styles/CircleMenu.module.scss";
import { ICircleMenuAppProps } from "../interfaces/ICircleMenuAppProps";
import { MenuWrapper } from "./MenuWrapper";
import { WebPartPropsContextProvider } from "../contexts/webpart-context/WebPartPropsContext";
import { DivisionContextProvider } from "../contexts/division-context/DivisionsContext";
import { Guideline } from "./guideline-component/Guideline";

export const CircleMenuApp: React.FC<ICircleMenuAppProps> = (props) => {
  const guidelineRef = React.useRef(null);
  const [guideLineHeight, setGuideLineHeight] = React.useState(500);

  React.useEffect(() => {
    if (guidelineRef) {
      const h = document.getElementById("guideline").clientHeight;
      setGuideLineHeight(500 + h);
    }
  }, [guidelineRef]);

  return (
    <WebPartPropsContextProvider {...props}>
      <DivisionContextProvider {...props}>
        <div className={styles.circleMenu}>
          <div
            ref={guidelineRef}
            className={styles.container}
            style={{ height: guideLineHeight }}
          >
            <div id="guideline" style={{ zIndex: 300, position: "absolute" }}>
              <Guideline />
            </div>
            <MenuWrapper />
          </div>
        </div>
      </DivisionContextProvider>
    </WebPartPropsContextProvider>
  );
};
