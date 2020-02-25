import * as React from "react";
import { createContext, useState, useEffect } from "react";

export interface IWebPartPropsContextProps {
  menuItems: IMenuItem[];
}

export interface IMenuItem {
  color: string;
  icon: string;
  click: () => void;
}

export interface IWebPartPropsContext {
  menuItems: IMenuItem[];
}

export const WebPartPropsContext = createContext<IWebPartPropsContext>(
  {} as IWebPartPropsContext
);

export const WebPartPropsContextProvider: React.FC<IWebPartPropsContextProps> = props => {
  const { menuItems } = props;
  //const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);

  return (
    <WebPartPropsContext.Provider value={{ menuItems }}>
      {props.children}
    </WebPartPropsContext.Provider>
  );
};
