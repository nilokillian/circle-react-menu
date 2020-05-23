import * as React from "react";
import { WebPartPropsContext } from "../../contexts/webpart-context/WebPartPropsContext";
import {
  ContextualMenuItemType,
  IContextualMenuItem,
  IContextualMenuProps,
  IContextualMenuItemProps,
  DefaultButton,
} from "office-ui-fabric-react";
import { checkRemoteWebPermissions } from "../../utils/api";
import { IAnimatedMwnuItem } from "../../interfaces/IAnimatedMwnuItem";
import { DetailsCalloutComponent } from "../DetailsCalloutComponent";

import { cardContextualMenuBtnStyle } from "../../styles/fabricStyles";
import styles from "./CardContextualMenuStyle.module.scss";

export const CardContextualMenu: React.FC<IAnimatedMwnuItem> = (
  props
): JSX.Element => {
  const { context: ctx } = React.useContext(WebPartPropsContext);

  const composeItems = (items: any[]): IContextualMenuItem[] => {
    const tempArr: IContextualMenuItem[] = [];
    items.map((i) => {
      checkRemoteWebPermissions(i.url, ctx)
        .then((res) => {
          if (res.value) {
            tempArr.push({
              key: i.title,
              text: i.title,
              href: i.url,
            });

            tempArr.push({
              key: "divider_1",
              itemType: ContextualMenuItemType.Divider,
            });
          }
        })
        .catch((err) => console.log(err));
    });

    return tempArr;
  };

  const menuProps: IContextualMenuProps = React.useMemo(
    () => ({
      items: composeItems(props.subMenu),
      shouldFocusOnMount: true,
      styles: { list: { width: 195 } },
      contextualMenuItemAs: (menuItemProps: IContextualMenuItemProps) => (
        <div>{menuItemProps.item.text}</div>
      ),
    }),
    [props.subMenu]
  );

  return (
    <div className={styles.cardContextualMenuContainer}>
      <DetailsCalloutComponent />
      <DefaultButton
        text="Links"
        menuProps={menuProps}
        styles={cardContextualMenuBtnStyle}
      />
    </div>
  );
};
