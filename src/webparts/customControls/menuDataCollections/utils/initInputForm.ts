import { ID } from "./generateId";
import { IInputsCollection } from "../interfaces/IInputsCollection";

export const initInputForm = (
  fields: any[],
  parentUniqueId?: string
): IInputsCollection => {
  let obj: IInputsCollection = {};

  fields.map((f) => {
    const key = f.id;
    obj = {
      ...obj,
      [key]: {
        value: f.type === "checkbox" ? false : "",
        uniqueId: ID(),
        relationId: parentUniqueId ? parentUniqueId : "",
        type: f.type,
      },
    };
  });

  return obj;
};
