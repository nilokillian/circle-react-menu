import { IInputsCollection } from "../interfaces/IInputsCollection";

export const validateFields = (collection: IInputsCollection): boolean => {
  const anyEmpty = Object.entries(collection).some((obj) => !obj[1].value);
  return !anyEmpty;
};

export const validateCollections = (
  currentCollection: IInputsCollection,
  existingCollection: IInputsCollection
) => {};
