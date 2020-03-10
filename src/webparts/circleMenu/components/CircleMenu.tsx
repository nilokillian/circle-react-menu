import * as React from "react";
import styles from "../styles/CircleMenuApp.module.scss";
import { ICircleMenuProps } from "../interfaces/ICircleMenuProps";
import { MenuWrapper } from "./MenuWrapper";
import { WebPartPropsContextProvider } from "../contexts/WebPartProps";

export const CircleMenu: React.FC<ICircleMenuProps> = props => {
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
