export interface IPropertyMenuDataCollectionsFields {
  id: string;
  title: string;
  type: string;
  setDefaultValue?: () => string;
  onCustomRender?: (
    field: string,
    value: any,
    onCustomFieldUpdate: (
      field: string,
      colorObj: string,
      dataCollectionId?: string
    ) => any,
    dataCollectionId?: string
  ) => JSX.Element;
}
