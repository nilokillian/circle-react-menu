import { IDataCollections } from "./IDataCollections";
import { ICurrentDataCollection } from "./ICurrentDataCollection";
import { IPropertyMenuDataCollectionsFields } from "../propertyMenuDataCollections";

export interface ITableRenderProps {
  level: number;
  fields: any[];
  dataCollections: IDataCollections[];
  currentDataCollection: ICurrentDataCollection;
  onCurrentDataCollectionChange: (value: ICurrentDataCollection) => void;
  onAddToCollection: (collection: ICurrentDataCollection, lvl: number) => void;
  onCustomFieldUpdate: () => void;
  toggleContainer: (
    value: string,
    parentUniqueId: string,
    titleValue: string
  ) => void;
}
