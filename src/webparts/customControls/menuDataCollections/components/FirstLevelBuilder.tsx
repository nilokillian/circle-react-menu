import * as React from "react";
import { IPropertyMenuDataCollectionsFields } from "../propertyMenuDataCollections";
import {
  ICurrentDataCollection,
  IDataCollections
} from "./MenuDataCollectionsBuilderPanel";
import { TableRender } from "./TableRender";
import { ID } from "../utils/generateId";

export interface IFirstLevelBuilderProps {
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

export const FirstLevelBuilder: React.FC<IFirstLevelBuilderProps> = ({
  fields,
  dataCollections,
  containerToggle,
  onAddToCollection
}): JSX.Element => {
  const [currentDataCollection, setCurrentDataCollection] = React.useState<
    ICurrentDataCollection
  >({} as ICurrentDataCollection);

  React.useEffect(() => {
    initInputForm();
  }, []);

  const initInputForm = (): void => {
    let obj;

    fields.map(f => {
      const key = f.id;
      obj = {
        ...obj,
        [key]: {
          value: f.type === "checkbox" ? false : "",
          uniqueId: ID(),
          relationId: "",
          type: f.type
        }
      };
    });

    setCurrentDataCollection(obj);
  };

  return (
    <TableRender
      level={1}
      fields={fields}
      currentDataCollection={currentDataCollection}
      onCurrentDataCollectionChange={dataCollection => {
        setCurrentDataCollection(dataCollection);
      }}
      onAddToCollection={() => {
        onAddToCollection(currentDataCollection, 1, ID());
        initInputForm();
      }}
      onCustomFieldUpdate={null}
      dataCollections={dataCollections}
      containerToggle={containerToggle}
    />
  );
};
