import { ICurrentDataCollection } from "./ICurrentDataCollection";

export interface IDataCollections {
  fields: ICurrentDataCollection;
  relationId?: string;
  level: number;
}
