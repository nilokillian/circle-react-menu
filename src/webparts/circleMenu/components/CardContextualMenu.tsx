import * as React from "react";
import { SPPermission } from "@microsoft/sp-page-context";
import { WebPartPropsContext } from "../contexts/WebPartPropsContext";
import {
  ContextualMenuItemType,
  IContextualMenuItem,
  IContextualMenuProps,
  IContextualMenuItemProps,
} from "office-ui-fabric-react/lib/ContextualMenu";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { ICard } from "../interfaces/ICard";
import {
  SecurityTrimmedControl,
  PermissionLevel,
} from "@pnp/spfx-controls-react/lib/SecurityTrimmedControl";

export const CardContextualMenu: React.FC<ICard> = (props): JSX.Element => {
  const { pageContext } = React.useContext(WebPartPropsContext);
  const composeItems = (items: any[]): IContextualMenuItem[] => {
    const tempArr: IContextualMenuItem[] = [];
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

  const menuProps: IContextualMenuProps = React.useMemo(
    () => ({
      items: composeItems(props.subMenu),
      shouldFocusOnMount: true,
      contextualMenuItemAs: (menuItemProps: IContextualMenuItemProps) => (
        <SecurityTrimmedControl
          context={pageContext}
          level={PermissionLevel.remoteWeb}
          remoteSiteUrl={menuItemProps.item.href}
          permissions={[SPPermission.viewListItems]}
        >
          <div>{menuItemProps.item.text}</div>
        </SecurityTrimmedControl>
      ),
    }),
    [composeItems(props.subMenu)]
  );

  return (
    <DefaultButton
      text={props.title}
      menuProps={menuProps}
      styles={{ menuIcon: { display: "none" }, root: { width: 197 } }}
    />
  );
};
