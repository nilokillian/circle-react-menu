import { ID } from "./generateId";

export const initInputForm = (fields: any[], parentUniqueId?: string) => {
  let obj: {};

  fields.map(f => {
    const key = f.id;
    obj = {
      ...obj,
      [key]: {
        value: f.type === "checkbox" ? false : "",
        uniqueId: ID(),
        relationId: parentUniqueId ? parentUniqueId : "",
        type: f.type
      }
    };
  });

  return obj;
};
