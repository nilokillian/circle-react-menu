import * as React from "react";

import { ICircleMenuAppProps } from "../../interfaces/ICircleMenuAppProps";
import { MenuWrapper } from "../MenuWrapper";
import { WebPartPropsContextProvider } from "../../contexts/webpart-context/WebPartPropsContext";
import { DivisionContextProvider } from "../../contexts/division-context/DivisionsContext";
import { Guideline } from "../guideline-component/Guideline";

import styles from "../../styles/CircleMenu.module.scss";

export const CircleMenuApp: React.FC<ICircleMenuAppProps> = (props) => {
  return (
    <WebPartPropsContextProvider {...props}>
      <DivisionContextProvider {...props}>
        <div className={styles.circleMenu}>
          <div className={styles.container}>
            {/* <div id="guideline" style={{ zIndex: 300 }}> */}
            <Guideline />
            {/* </div> */}

            <MenuWrapper />
          </div>
        </div>
      </DivisionContextProvider>
    </WebPartPropsContextProvider>
  );
};
