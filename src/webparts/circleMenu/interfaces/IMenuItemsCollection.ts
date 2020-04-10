import { IInputsCollection } from "../../customControls/menuDataCollections/interfaces/IInputsCollection";

export interface IMenuItemsCollection {
  fields: IInputsCollection;
  uniqueId: string;
  relationId: string;
  level: number;
}
