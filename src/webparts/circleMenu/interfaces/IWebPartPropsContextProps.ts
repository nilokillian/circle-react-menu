import { IMenuItemsCollection } from "./IMenuItemsCollection";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IWebPartPropsContextProps {
  menuItemsCollections: IMenuItemsCollection[];
  centreToCircle: number;
  context: WebPartContext;
}
