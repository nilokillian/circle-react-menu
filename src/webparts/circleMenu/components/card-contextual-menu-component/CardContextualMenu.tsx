import * as React from "react";
import { WebPartPropsContext } from "../../contexts/webpart-context/WebPartPropsContext";
import { DivisionContext } from "../../contexts/division-context/DivisionsContext";
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

import styles from "./CardContextualMenuStyle.module.scss";

export const CardContextualMenu: React.FC<IAnimatedMwnuItem> = (
  props
): JSX.Element => {
  const { context: ctx } = React.useContext(WebPartPropsContext);
  const divisions = React.useContext(DivisionContext);

  const getDevisionInfo = () => {
    const devision = divisions.find((d) => d.extraInfoId === props.extraInfoId);
    return devision ? devision : {};
  };

  const composeItems = (items: any[]): IContextualMenuItem[] => {
    const tempArr: IContextualMenuItem[] = [];
    const tenantUri = window.location.protocol + "//" + window.location.host;
    items.map((i) => {
      const currentlink: string = i.url;

      // if (currentlink.indexOf(tenantUri) > -1) {
      //   checkRemoteWebPermissions(i.url, ctx)
      //     .then((res) => {
      //       if (res.value) {
      //         tempArr.push({
      //           key: i.title,
      //           text: i.title,
      //           href: i.url,
      //         });

      //         tempArr.push({
      //           key: "divider_1",
      //           itemType: ContextualMenuItemType.Divider,
      //         });
      //       }
      //     })
      //     .catch((err) => console.log(err));
      // } else {
      tempArr.push({
        key: i.title,
        text: i.title,
        href: i.url,
        target: "_blank",
        ["data-interception"]: "off",
        style: { fontSize: 12 },
      });
      tempArr.push({
        key: "divider_1",
        itemType: ContextualMenuItemType.Divider,
      });
      //   }
    });

    return tempArr;
  };

  const menuProps: IContextualMenuProps = React.useMemo(
    () => ({
      items: composeItems(props.subMenu),
      shouldFocusOnMount: true,
      styles: { root: { width: 200 } },
      contextualMenuItemAs: (menuItemProps: IContextualMenuItemProps) => (
        <div>{menuItemProps.item.text}</div>
      ),
    }),
    [props.subMenu]
  );

  return (
    <div className={styles.cardContextualMenuContainer}>
      <DetailsCalloutComponent details={getDevisionInfo()} />
      <DefaultButton
        text="Links"
        menuProps={menuProps}
        styles={{
          menuIcon: { display: "none" },
          root: { minWidth: 200, fontSize: 12 },
        }}
      />
    </div>
  );
};
