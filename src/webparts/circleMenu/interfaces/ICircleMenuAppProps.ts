import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICircleMenuAppProps {
  menuItemsCollections: any[];
  centreToCircle: number;
  context: WebPartContext;
}
