import * as React from "react";
import { createContext, useState, useEffect } from "react";
import { IWebPartPropsContextProps } from "../interfaces/IWebPartPropsContextProps";
import { IMenuItemsCollection } from "../interfaces/IMenuItemsCollection";

export interface IWebPartPropsContext {
  menuItems: IMenuItemsCollection[];
}

export const WebPartPropsContext = createContext<IWebPartPropsContext>(
  {} as IWebPartPropsContext
);

export const WebPartPropsContextProvider: React.FC<IWebPartPropsContextProps> = ({
  menuItemsCollections,
  children
}) => {
  const [menuItemsState, setMenuItemsState] = useState<IMenuItemsCollection[]>(
    []
  );

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
          icon: itemsCollection.fields["icon"].value,
          color: itemsCollection.fields["colour"].value,
          subMenu:
            itemsCollection.level <= 3 &&
            getSubItems(menuItemsCollections, itemsCollection.uniqueId)
        });
      }
    }

    return tempArray;
  };

  const composeItems = (): void => {
    const composedMenuItems = [];

    for (let collection of menuItemsCollections) {
      if (collection.level === 1) {
        composedMenuItems.push({
          title: collection.fields["title"].value,
          url: collection.fields["url"].value,
          icon: collection.fields["icon"].value,
          color: collection.fields["colour"].value,
          subMenu: getSubItems(menuItemsCollections, collection.uniqueId)
        });
      }
    }
    setMenuItemsState(composedMenuItems);
  };

  useEffect(() => {
    composeItems();
  }, [menuItemsCollections]);

  return (
    <WebPartPropsContext.Provider value={{ menuItems: menuItemsState }}>
      {children}
    </WebPartPropsContext.Provider>
  );
};
