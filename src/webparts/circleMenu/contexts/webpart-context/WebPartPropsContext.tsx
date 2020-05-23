import * as React from "react";
import { createContext } from "react";
import { IWebPartPropsContextProps } from "../../interfaces/IWebPartPropsContextProps";
import { IMenuItemsCollection } from "../../interfaces/IMenuItemsCollection";
import { IWebPartPropsContext } from "./interfaces/IWebPartPropsContext";

export const WebPartPropsContext = createContext<IWebPartPropsContext>(
  {} as IWebPartPropsContext
);

export const WebPartPropsContextProvider: React.FC<IWebPartPropsContextProps> = ({
  menuItemsCollections,
  centreToCircle,
  context,
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
          extraInfoId: itemsCollection.fields["extraInfoId"].value,
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
          extraInfoId: collection.fields["extraInfoId"].value,
          subMenu: getSubItems(menuItemsCollections, collection.uniqueId),
        });
      }
    }

    return composedMenuItems;
  };

  return (
    <WebPartPropsContext.Provider
      value={{ menuItems: composeItems(), centreToCircle, context }}
    >
      {children}
    </WebPartPropsContext.Provider>
  );
};
