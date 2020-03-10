import { IPropertyMenuDataCollectionsFields } from "./IPropertyMenuDataCollectionsFields";

export interface IPropertyMenuDataCollectionsProps {
  key: string;
  panelHeaderTitle: string;
  calloutButtonTitle: string;
  value: any[];
  fields: IPropertyMenuDataCollectionsFields[];
  customRender?: (
    field: string,
    value: any,
    onCustomFieldUpdate: (field: string, colorObj: string) => any
  ) => JSX.Element;
  onProppertyChange(propertyPath: string, oldValue: any, newValue: any): void;
}
