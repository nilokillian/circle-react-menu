import * as React from "react";
import { TableRender } from "./TableRender";
import { initInputForm } from "../utils/initInputForm";
import { IMenuItemsBuilderProps } from "../interfaces/IMenuItemsBuilderProps";
import { ICurrentDataCollection } from "../interfaces/ICurrentDataCollection";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react";
import styles from "../styles/MenuDataCollection.module.scss";

export const MenuItemsBuilder: React.FC<IMenuItemsBuilderProps> = ({
  level,
  parentUniqueId,
  fields,
  dataCollections,
  toggleContainer,
  onAddToCollection,
  onRemoveDataCollection,
  onPanelDismiss,
  onChangeDataCollection
}): JSX.Element => {
  const [currentDataCollection, setCurrentDataCollection] = React.useState<
    ICurrentDataCollection
  >({} as ICurrentDataCollection);

  const [isValid, setIsValid] = React.useState(false);

  const handleCurrentDataCollectionChange = (
    dataCollection: ICurrentDataCollection
  ): void => {
    setCurrentDataCollection(dataCollection);
  };

  const validate = (collection: ICurrentDataCollection) => {
    const anyEmpty = Object.entries(collection).some(obj => !obj[1].value);
    setIsValid(anyEmpty);
  };

  const getDataCollectionUniqueId = () => {
    const id = Object.entries(currentDataCollection).find(
      obj => !obj[1].uniqueId
    );
  };

  React.useEffect(() => {
    setCurrentDataCollection(initInputForm(fields, parentUniqueId));
  }, []);

  React.useEffect(() => {
    validate(currentDataCollection);
  }, [currentDataCollection]);

  return (
    <>
      <TableRender
        level={level}
        fields={fields}
        currentDataCollection={currentDataCollection}
        onCurrentDataCollectionChange={dataCollection =>
          handleCurrentDataCollectionChange(dataCollection)
        }
        onAddToCollection={() => {
          onAddToCollection(currentDataCollection, level, parentUniqueId);
          setCurrentDataCollection(initInputForm(fields, parentUniqueId));
        }}
        onRemoveDataCollection={onRemoveDataCollection}
        onChangeDataCollection={onChangeDataCollection}
        dataCollections={dataCollections}
        toggleContainer={toggleContainer}
      />
      <div className={styles.panelActions}>
        <PrimaryButton
          text="Save"
          disabled={isValid}
          styles={{ root: { marginRight: 15 } }}
          onClick={() => {
            onAddToCollection(currentDataCollection, level, parentUniqueId);
            setCurrentDataCollection(initInputForm(fields, parentUniqueId));
          }}
        />
        <DefaultButton text="Cancel" onClick={onPanelDismiss} />
      </div>
    </>
  );
};
