import { IDataCollections } from "./IDataCollections";
import { ICurrentDataCollection } from "./ICurrentDataCollection";
import { IPropertyMenuDataCollectionsFields } from "./IPropertyMenuDataCollectionsFields";

export interface ITableRenderProps {
  level: number;
  fields: IPropertyMenuDataCollectionsFields[];
  dataCollections: IDataCollections[];
  currentDataCollection: ICurrentDataCollection;
  onCurrentDataCollectionChange: (value: ICurrentDataCollection) => void;
  onAddToCollection: (collection: ICurrentDataCollection, lvl: number) => void;
  onRemoveDataCollection: (dataCollectionId: string) => void;
  toggleContainer: (parentUniqueId: string, titleValue: string) => void;
}
