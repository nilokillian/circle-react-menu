import * as React from "react";
import { IPropertyMenuDataCollectionsFields } from "../propertyMenuDataCollections";

import {
  ICurrentDataCollection,
  IDataCollections
} from "./MenuDataCollectionsBuilderPanel";
import { TableRender } from "./TableRender";
import { ID } from "../utils/generateId";

export interface ISecondLevelBuilderProps {
  parentUniqueId: string;
  fields: IPropertyMenuDataCollectionsFields[];
  dataCollections: IDataCollections[];
  containerToggle: (
    value: string,
    parentUniqueId: string,
    titleValue: string
  ) => void;
  onAddToCollection: (
    collection: ICurrentDataCollection,
    lvl: number,
    uniqueId: string
  ) => void;
}

export const SecondLevelBuilder: React.FC<ISecondLevelBuilderProps> = ({
  parentUniqueId,
  fields,
  dataCollections,
  containerToggle,
  onAddToCollection
}): JSX.Element => {
  const [currentDataCollection, setCurrentDataCollection] = React.useState<
    ICurrentDataCollection
  >({} as ICurrentDataCollection);

  React.useEffect(() => {
    resetInputForm();
  }, []);

  const resetInputForm = (): void => {
    let obj;

    fields.map(f => {
      const key = f.id;
      obj = {
        ...obj,
        [key]: {
          value: f.type === "checkbox" ? false : "",
          uniqueId: ID(),
          relationId: parentUniqueId,
          type: f.type
        }
      };
    });

    setCurrentDataCollection(obj);
  };

  return (
    <TableRender
      fields={fields}
      level={2}
      currentDataCollection={currentDataCollection}
      onCurrentDataCollectionChange={dataCollection =>
        setCurrentDataCollection(dataCollection)
      }
      onAddToCollection={() => {
        onAddToCollection(currentDataCollection, 2, parentUniqueId);
        resetInputForm();
      }}
      onCustomFieldUpdate={null}
      dataCollections={dataCollections}
      containerToggle={containerToggle}
    />
  );
};
