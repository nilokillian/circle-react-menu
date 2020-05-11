import * as React from "react";
import { createContext } from "react";
import { IWebPartPropsContextProps } from "../interfaces/IWebPartPropsContextProps";
import { IMenuItemsCollection } from "../interfaces/IMenuItemsCollection";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IWebPartPropsContext {
  menuItems: IMenuItemsCollection[];
  centreToCircle: number;
  pageContext: WebPartContext;
}

export const WebPartPropsContext = createContext<IWebPartPropsContext>(
  {} as IWebPartPropsContext
);

export const WebPartPropsContextProvider: React.FC<IWebPartPropsContextProps> = ({
  menuItemsCollections,
  centreToCircle,
  pageContext,
  children,
}) => {
  const getSubItems = (
    itemsCollections: IMenuItemsCollection[],
    perentId: string
  ) => {
    const tempArray = [];

    for (let itemsCollection of itemsCollections) {
      if (itemsCollection.relationId === perentId) {
        tempArray.push({
          title: itemsCollection.fields["title"].value,
          url: itemsCollection.fields["url"].value,
          imageUrl: itemsCollection.fields["imageUrl"].value,
          icon: itemsCollection.fields["icon"].value,
          color: itemsCollection.fields["colour"].value,
          subMenu:
            itemsCollection.level <= 3 &&
            getSubItems(menuItemsCollections, itemsCollection.uniqueId),
        });
      }
    }

    return tempArray;
  };

  const composeItems = (): any[] => {
    const composedMenuItems = [];

    for (let collection of menuItemsCollections) {
      if (collection.level === 1) {
        composedMenuItems.push({
          title: collection.fields["title"].value,
          url: collection.fields["url"].value,
          icon: collection.fields["icon"].value,
          imageUrl: collection.fields["imageUrl"].value,
          color: collection.fields["colour"].value,
          subMenu: getSubItems(menuItemsCollections, collection.uniqueId),
        });
      }
    }

    return composedMenuItems;
  };

  return (
    <WebPartPropsContext.Provider
      value={{ menuItems: composeItems(), centreToCircle, pageContext }}
    >
      {children}
    </WebPartPropsContext.Provider>
  );
};
