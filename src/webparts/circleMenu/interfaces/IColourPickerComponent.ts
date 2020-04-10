export interface IColourPickerComponentProps {
  color: string;
  field: any;
  onUpdate: (fieldId: string, value: any, dataCollectionId?: string) => void;
  dataCollectionId: string;
}

export interface IColourPickerComponentState {
  isColourPicker: boolean;
}
