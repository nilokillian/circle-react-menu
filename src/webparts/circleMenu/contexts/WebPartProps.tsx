import * as React from "react";
import { createContext, useState, useEffect } from "react";
import { IWebPartPropsContextProps } from "../interfaces/IWebPartPropsContextProps";
import { IMenuItem } from "../interfaces/IMenuItem";

export interface IWebPartPropsContext {
  menuItems: IMenuItem[];
}

export const WebPartPropsContext = createContext<IWebPartPropsContext>(
  {} as IWebPartPropsContext
);

export const WebPartPropsContextProvider: React.FC<IWebPartPropsContextProps> = ({
  menuItems,
  children
}) => {
  const [menuItemsState, setMenuItemsState] = useState<IMenuItem[]>([]);

  useEffect(() => {
    console.log("Fired");
    setMenuItemsState(menuItems);
  }, [menuItems]);

  return (
    <WebPartPropsContext.Provider value={{ menuItems: menuItemsState }}>
      {children}
    </WebPartPropsContext.Provider>
  );
};
