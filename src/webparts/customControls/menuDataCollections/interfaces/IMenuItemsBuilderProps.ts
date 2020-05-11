import { IDataCollections } from "./IDataCollections";
import { IInputsCollection } from "./IInputsCollection";
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
    inputs: IInputsCollection,
    lvl: number,
    relationId?: string
  ) => void;
  onRemoveDataCollection: (dataCollectionId: string) => void;
  onChangeDataCollection: (
    dataCollectionId: string,
    fieldName: string,
    newValue: string | boolean
  ) => void;
}
