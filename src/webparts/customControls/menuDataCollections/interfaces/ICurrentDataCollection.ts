export interface ICurrentDataCollection {
  [key: string]: {
    value: string | boolean;
    uniqueId: string;
    type: string;
  };
}
