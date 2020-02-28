import * as React from "react";
import { TableRender } from "./TableRender";
import { initInputForm } from "../utils/initInputForm";
import { ISubLevelBuilderProps } from "../interfaces/ISubLevelBuilderProps";
import { ICurrentDataCollection } from "../interfaces/ICurrentDataCollection";

export const SecondLevelBuilder: React.FC<ISubLevelBuilderProps> = ({
  parentUniqueId,
  fields,
  dataCollections,
  toggleContainer,
  onAddToCollection
}): JSX.Element => {
  const [currentDataCollection, setCurrentDataCollection] = React.useState<
    ICurrentDataCollection
  >({} as ICurrentDataCollection);

  React.useEffect(() => {
    setCurrentDataCollection(initInputForm(fields, parentUniqueId));
  }, []);

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
        setCurrentDataCollection(initInputForm(fields, parentUniqueId));
      }}
      onCustomFieldUpdate={null}
      dataCollections={dataCollections}
      toggleContainer={toggleContainer}
    />
  );
};
