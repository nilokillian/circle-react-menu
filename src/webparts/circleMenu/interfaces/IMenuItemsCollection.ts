import { ICurrentDataCollection } from "../../customControls/menuDataCollections/interfaces/ICurrentDataCollection";

export interface IMenuItemsCollection {
  fields: ICurrentDataCollection;
  uniqueId: string;
  relationId: string;
  level: number;
}
