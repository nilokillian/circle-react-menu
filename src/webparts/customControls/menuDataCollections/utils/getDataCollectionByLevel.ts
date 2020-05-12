import { IDataCollections } from "../interfaces/IDataCollections";

export const getDataCollectionByLevel = (
  dataCollections: IDataCollections[],
  subLevel: number,
  parentUniqueId: string
): IDataCollections[] => {
  return subLevel === 1
    ? dataCollections.filter((d) => d.level === subLevel)
    : dataCollections.filter(
        (d) => d.level === subLevel && d.relationId === parentUniqueId
      );
};
