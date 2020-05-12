import { IDataCollections } from "./IDataCollections";
import { IInputsCollection } from "./IInputsCollection";

export interface ITableRenderProps {
  isValid: boolean;
  inputFormValuesCollection: IInputsCollection;
  dataCollections: IDataCollections[];
  // onRemoveDataCollection: (dataCollectionId: string) => void;
}
