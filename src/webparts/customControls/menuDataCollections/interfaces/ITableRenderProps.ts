import { IDataCollections } from "./IDataCollections";

export interface ITableRenderProps {
  isValid: boolean;
  level: number;
  dataCollections: IDataCollections[];
  onRemoveDataCollection: (dataCollectionId: string) => void;
  onChangeDataCollection: (
    dataCollectionId: string,
    fieldName: string,
    newValue: string | boolean
  ) => void;
}
