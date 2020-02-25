import * as React from "react";
import styles from "../styles/CircleMenu.module.scss";
import { Icon } from "office-ui-fabric-react";

export const MenuToggle = ({ toggle, open, animateButtons }) => (
  <button
    className={
      open
        ? `${styles.menuToggle} ${styles.toggleOpen}`
        : `${styles.menuToggle} ${styles.toggleClosed}`
    }
    onClick={() => {
      toggle();
      setTimeout(animateButtons, 120);
    }}
  >
    {open ? (
      <Icon
        iconName="Cancel"
        className="ms-IconExample"
        styles={{ root: { fontWeight: 900 } }}
      />
    ) : (
      <Icon
        iconName="GlobalNavButton"
        className="ms-IconExample"
        styles={{ root: { fontWeight: 900 } }}
      />
    )}
  </button>
);
