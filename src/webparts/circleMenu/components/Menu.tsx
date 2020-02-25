import * as React from "react";
import styles from "../styles/CircleMenu.module.scss";
import { MenuItems } from "./MenuItems";

export const Menu = ({ size, items, open }) => (
  <div className={open ? styles.menuWrapperOpen : styles.menuWrapperClosed}>
    <div className={styles.menuBackground}>
      <MenuItems size={size} items={items} open={open} />
    </div>
  </div>
);
