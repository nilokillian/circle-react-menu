import * as React from "react";
import styles from "../styles/CircleMenu.module.scss";
import { ICircleMenuAppProps } from "../interfaces/ICircleMenuAppProps";
import { MenuWrapper } from "./MenuWrapper";
import { WebPartPropsContextProvider } from "../contexts/webpart-context/WebPartPropsContext";
import { DivisionContextProvider } from "../contexts/division-context/DivisionsContext";

export const CircleMenuApp: React.FC<ICircleMenuAppProps> = (props) => {
  return (
    <div className={styles.circleMenu}>
      <div className={styles.container}>
        <WebPartPropsContextProvider {...props}>
          <DivisionContextProvider {...props}>
            <MenuWrapper />
          </DivisionContextProvider>
        </WebPartPropsContextProvider>
      </div>
    </div>
  );
};
