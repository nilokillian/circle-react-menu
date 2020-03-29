export interface IPropertyMenuDataCollectionsFields {
  id: string;
  title: string;
  type: string;
  setDefaultValue?: () => string;
  onCustomRender?: (
    field: string,
    value: any,
    onCustomFieldUpdate: (field: string, colorObj: string) => any
  ) => JSX.Element;
}
