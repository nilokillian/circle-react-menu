import * as React from "react";
import styles from "../styles/CircleMenu.module.scss";
import { Icon } from "office-ui-fabric-react/lib/Icon";

export interface IGuideline {
  items: any[];
}

export const Guideline: React.FC<IGuideline> = ({ items }): JSX.Element => {
  return (
    <div className={styles.guideline}>
      {items.map((item) => (
        <div className={styles.iconContainer}>
          <Icon
            styles={{ root: { fontSize: 20, color: item.color } }}
            iconName={item.icon}
            aria-describedby={item.title}
          />
          <span className={styles.iconTitle}>{item.title}</span>
        </div>
      ))}
    </div>
  );
};
