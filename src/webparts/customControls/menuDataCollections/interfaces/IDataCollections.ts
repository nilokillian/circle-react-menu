import { IInputsCollection } from "./IInputsCollection";

export interface IDataCollections {
  fields: IInputsCollection;
  uniqueId: string;
  relationId?: string;
  level: number;
}
