import { ICurrentDataCollection } from "./ICurrentDataCollection";

export interface IDataCollections {
  fields: ICurrentDataCollection;
  uniqueId: string;
  relationId?: string;
  level: number;
}
