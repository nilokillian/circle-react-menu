import { IDataCollections } from "./IDataCollections";
import { IInputsCollection } from "./IInputsCollection";
import { IPropertyMenuDataCollectionsFields } from "./IPropertyMenuDataCollectionsFields";

export interface ITableRenderProps {
  isValid: boolean;
  level: number;
  fields: IPropertyMenuDataCollectionsFields[];
  dataCollections: IDataCollections[];
  inputsCollection: IInputsCollection;
  onInputsCollectionChange: (value: IInputsCollection) => void;
  onAddToCollection: (collection: IInputsCollection, lvl: number) => void;
  onRemoveDataCollection: (dataCollectionId: string) => void;
  onChangeDataCollection: (
    dataCollectionId: string,
    fieldName: string,
    newValue: string | boolean
  ) => void;
  toggleContainer: (parentUniqueId: string, titleValue: string) => void;
}
