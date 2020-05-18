import * as React from "react";
import { WebPartPropsContext } from "../contexts/WebPartPropsContext";
import {
  ContextualMenuItemType,
  IContextualMenuItem,
  IContextualMenuProps,
  IContextualMenuItemProps,
} from "office-ui-fabric-react/lib/ContextualMenu";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { checkRemoteWebPermissions } from "../utils/api";
import { IAnimatedMwnuItem } from "../interfaces/IAnimatedMwnuItem";
import { DetailsCalloutComponent } from "./DetailsCalloutComponent";

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
    <>
      <DetailsCalloutComponent />
      <DefaultButton
        text="Links"
        menuProps={menuProps}
        styles={{
          menuIcon: { display: "none" },
          root: { width: 197, fontSize: 12 },
        }}
      />
    </>
  );
};
