import { ICurrentDataCollection } from "../interfaces/ICurrentDataCollection";

export const validate = (collection: ICurrentDataCollection): boolean => {
  const anyEmpty = Object.entries(collection).some(obj => !obj[1].value);
  return !anyEmpty;
};
