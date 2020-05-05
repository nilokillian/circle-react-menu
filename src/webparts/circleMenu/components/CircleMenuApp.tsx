import * as React from "react";
import styles from "../styles/CircleMenuApp.module.scss";
import { ICircleMenuAppProps } from "../interfaces/ICircleMenuAppProps";
import { MenuWrapper } from "./MenuWrapper";
import { WebPartPropsContextProvider } from "../contexts/WebPartPropsContext";

export const CircleMenuApp: React.FC<ICircleMenuAppProps> = (props) => {
  return (
    <div className={styles.circleMenu}>
      <div className={styles.container}>
        <WebPartPropsContextProvider {...props}>
          <MenuWrapper />
        </WebPartPropsContextProvider>
      </div>
    </div>
  );
};
