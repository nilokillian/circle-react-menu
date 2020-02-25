export interface IMenuColourPickerState {
  isColourPicker: boolean;
}

export interface IMenuColourPickerProps {
  color: string;
  field: any;
  onUpdate: (fieldId: string, value: any) => void;
}
