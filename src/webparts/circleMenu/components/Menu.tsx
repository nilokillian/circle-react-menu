import * as React from "react";
import styles from "../styles/CircleMenu.module.scss";
import { MenuItems } from "./menu-items-component/MenuItems";

const Menu = ({ centreToCircle, items }) => (
  <div className={styles.menuWrapperOpen}>
    <div className={styles.menuBackground}>
      <MenuItems centreToCircle={centreToCircle} items={items} open={open} />
    </div>
  </div>
);

export const MemoizedMenu = React.memo(Menu);

//<div className={open ? styles.menuWrapperOpen : styles.menuWrapperClosed}>
