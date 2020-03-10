import { IPropertyMenuDataCollectionsFields } from "./IPropertyMenuDataCollectionsFields";

export interface IMenuDataCollectionsBuilderPanelProps {
  key: string;
  label: string;
  btnLabel: string;
  value: any[];
  fields: IPropertyMenuDataCollectionsFields[];
  onChanged: (dataCollections: any) => void;
}
