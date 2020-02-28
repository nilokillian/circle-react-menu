import { IPropertyMenuDataCollectionsFields } from "../propertyMenuDataCollections";

export interface IMenuDataCollectionsBuilderPanelProps {
  key: string;
  label: string;
  btnLabel: string;
  value: any[];
  fields: IPropertyMenuDataCollectionsFields[];
  onChanged: () => void;
}
