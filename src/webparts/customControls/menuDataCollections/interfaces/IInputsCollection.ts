export interface IInputsCollection {
  [key: string]: {
    value: string | boolean;
    uniqueId: string;
    type: string;
  };
}
