import * as React from "react";

import { Icon } from "office-ui-fabric-react/lib/Icon";
import { WebPartPropsContext } from "../../contexts/webpart-context/WebPartPropsContext";
import { Stack, IStackTokens } from "office-ui-fabric-react";

import styles from "./Guideline.module.scss";

const stackTokens: IStackTokens = { childrenGap: 10 };
const everyFourth = ["0", "1", "2", "3", "4", "5", "6", "7"];

export const Guideline: React.FC = (): JSX.Element => {
  const { menuItems: items } = React.useContext(WebPartPropsContext);

  const test = () => {
    for (let i = 0; i < everyFourth.length; i++) {
      if (i && i % 3 === 0) {
        console.log(everyFourth[i]);
      }
    }
  };
  test();
  const composeIcons = (): JSX.Element[] => {
    // const icons = []

    return items.map((item, i) => {
      // if(i%4==0 ){

      //   icons.push()
      // }

      return (
        <Stack.Item>
          <div className={styles.iconContainer}>
            <Icon
              styles={{ root: { fontSize: 20, color: item.color } }}
              iconName={item.icon}
              aria-describedby={item.title}
            />
            <span className={styles.iconTitle}>{item.title}</span>
          </div>
        </Stack.Item>
      );
    });
  };

  return (
    <div className={styles.guideline}>
      <Stack horizontal wrap horizontalAlign="start" tokens={stackTokens}>
        {composeIcons()}
      </Stack>
    </div>
  );
};
