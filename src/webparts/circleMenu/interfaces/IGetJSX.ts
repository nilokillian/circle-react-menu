export interface IMenuColourPickerState {
  isColourPicker: boolean;
  initialColour: string;
}

export interface IMenuColourPickerProps {
  color: string;
  field: any;
  onUpdate: (fieldId: string, value: any) => void;
}
