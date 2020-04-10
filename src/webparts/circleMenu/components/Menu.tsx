import * as React from "react";
import styles from "../styles/CircleMenu.module.scss";
import { MenuItems } from "./MenuItems";

const Menu = ({ size, items }) => (
  <div className={styles.menuWrapperOpen}>
    <div className={styles.menuBackground}>
      <MenuItems size={size} items={items} open={open} />
    </div>
  </div>
);

export const MemoizedMenu = React.memo(Menu);

//<div className={open ? styles.menuWrapperOpen : styles.menuWrapperClosed}>
