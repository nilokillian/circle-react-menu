import * as React from "react";
import { TableRender } from "./TableRender";
import { ID } from "../utils/generateId";
import { initInputForm } from "../utils/initInputForm";
import { ISubLevelBuilderProps } from "../interfaces/ISubLevelBuilderProps";
import { ICurrentDataCollection } from "../interfaces/ICurrentDataCollection";

export const FirstLevelBuilder: React.FC<ISubLevelBuilderProps> = ({
  fields,
  dataCollections,
  toggleContainer,
  onAddToCollection
}): JSX.Element => {
  const [currentDataCollection, setCurrentDataCollection] = React.useState<
    ICurrentDataCollection
  >({} as ICurrentDataCollection);

  React.useEffect(() => {
    setCurrentDataCollection(initInputForm(fields));
  }, []);

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
        setCurrentDataCollection(initInputForm(fields));
      }}
      onCustomFieldUpdate={null}
      dataCollections={dataCollections}
      toggleContainer={toggleContainer}
    />
  );
};
