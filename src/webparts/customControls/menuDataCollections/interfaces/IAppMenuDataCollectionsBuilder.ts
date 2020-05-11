import { IPropertyMenuDataCollectionsFields } from "./IPropertyMenuDataCollectionsFields";

export interface IAppMenuDataCollectionsBuilderProps {
  key: string;
  label: string;
  btnLabel: string;
  value: any[];
  fields: IPropertyMenuDataCollectionsFields[];
  onWebPartPropsChanged: (dataCollections: any) => void;
}
