import { IPropertyMenuDataCollectionsFields } from "../propertyMenuDataCollections";
import { IDataCollections } from "./IDataCollections";
import { ICurrentDataCollection } from "./ICurrentDataCollection";

export interface ISubLevelBuilderProps {
  fields: IPropertyMenuDataCollectionsFields[];
  dataCollections: IDataCollections[];
  parentUniqueId?: string;
  toggleContainer: (
    value: string,
    parentUniqueId: string,
    titleValue: string
  ) => void;
  onAddToCollection: (
    collection: ICurrentDataCollection,
    lvl: number,
    uniqueId: string
  ) => void;
}
