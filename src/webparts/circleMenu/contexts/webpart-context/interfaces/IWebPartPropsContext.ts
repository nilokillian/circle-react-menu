import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IMenuItemsCollection } from "../../../interfaces/IMenuItemsCollection";

export interface IWebPartPropsContext {
  menuItems: any[];
  centreToCircle: number;
  context: WebPartContext;
}
