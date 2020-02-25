import * as React from "react";
import styles from "../styles/CircleMenu.module.scss";
import { Icon } from "office-ui-fabric-react";

export const MenuItems = ({ size, items, open }) => {
  const buttons = items.map(item => {
    const styling = {
      transform: `rotate(${item.rotation}deg) 
           translate(${size / 2}em) 
           rotate(${-item.rotation}deg)`,
      backgroundColor: item.color
    };

    return (
      <div
        className={
          item.show
            ? `${styles.menuItem} ${styles.itemShow}`
            : `${styles.menuItem} ${styles.itemHide}`
        }
        style={styling}
        onClick={item.click}
      >
        <Icon iconName="CompassNW" className="ms-IconExample" />
        {/* <i className={"fa " + item.icon} aria-hidden="true"></i> */}
      </div>
    );
  });

  return (
    <div
      className={
        open ? `${styles.buttonBg} ${styles.animateMenu}` : `${styles.buttonBg}`
      }
    >
      {buttons}
    </div>
  );
};
