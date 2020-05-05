import * as React from "react";
import {
  ContextualMenuItemType,
  IContextualMenuItem,
} from "office-ui-fabric-react/lib/ContextualMenu";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { ICard } from "../interfaces/ICard";

export const CardContextualMenu: React.FC<ICard> = (props): JSX.Element => {
  const composeItems = (items: any[]): IContextualMenuItem[] => {
    const tempArr = [];
    items.map((i) => {
      tempArr.push({
        key: i.title,
        text: i.title,
        href: i.url,
      });

      tempArr.push({
        key: "divider_1",
        itemType: ContextualMenuItemType.Divider,
      });
    });
    return tempArr;
  };
  return (
    <DefaultButton
      text={props.title}
      menuProps={{
        shouldFocusOnMount: true,
        items: composeItems(props.subMenu),
      }}
      styles={{ menuIcon: { display: "none" }, root: { width: 197 } }}
    />
  );
};
