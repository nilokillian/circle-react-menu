import { IDataCollections } from "./IDataCollections";
import { ICurrentDataCollection } from "./ICurrentDataCollection";
import { IPropertyMenuDataCollectionsFields } from "./IPropertyMenuDataCollectionsFields";

export interface IMenuItemsBuilderProps {
  key?: string | number;
  fields: IPropertyMenuDataCollectionsFields[];
  level: number;
  dataCollections: IDataCollections[];
  parentUniqueId?: string;
  onPanelDismiss: () => void;
  toggleContainer: (parentUniqueId: string, titleValue: string) => void;
  onAddToCollection: (
    collection: ICurrentDataCollection,
    lvl: number,
    relationId?: string
  ) => void;
  onRemoveDataCollection: (dataCollectionId: string) => void;
  onPropsChanged: () => void;
}
