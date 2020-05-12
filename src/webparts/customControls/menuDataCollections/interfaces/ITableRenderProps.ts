import { IDataCollections } from "./IDataCollections";
import { IInputsCollection } from "./IInputsCollection";

export interface ITableRenderProps {
  isValid: boolean;
  level: number;
  inputFormValuesCollection: IInputsCollection;
  dataCollections: IDataCollections[];
  // onRemoveDataCollection: (dataCollectionId: string) => void;
  // onChangeDataCollection: (
  //   dataCollectionId: string,
  //   fieldName: string,
  //   newValue: string | boolean
  // ) => void;
}
