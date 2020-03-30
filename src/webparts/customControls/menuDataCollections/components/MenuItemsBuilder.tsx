import * as React from "react";
import { TableRender } from "./TableRender";
import { initInputForm } from "../utils/initInputForm";
import { IMenuItemsBuilderProps } from "../interfaces/IMenuItemsBuilderProps";
import { ICurrentDataCollection } from "../interfaces/ICurrentDataCollection";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react";
import styles from "../styles/MenuDataCollection.module.scss";
import { validate } from "../utils/validate";

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
  const [dataCollection, setDataCollection] = React.useState<
    ICurrentDataCollection
  >({} as ICurrentDataCollection);

  const [isValid, setIsValid] = React.useState(false);

  const handleCurrentDataCollectionChange = (
    collection: ICurrentDataCollection
  ): void => {
    setDataCollection(collection);
  };

  const validateFields = (collection: ICurrentDataCollection): void => {
    setIsValid(validate(collection));
  };

  // const getDataCollectionUniqueId = () => {
  //   const id = Object.entries(currentDataCollection).find(
  //     obj => !obj[1].uniqueId
  //   );
  // };

  React.useEffect(() => {
    setDataCollection(initInputForm(fields, parentUniqueId));
  }, []);

  React.useEffect(() => {
    validateFields(dataCollection);
    setDefaultValue();
  }, [dataCollection]);

  const setDefaultValue = React.useCallback(() => {
    fields.map(field => {
      if (field.type === "custom") {
        if (dataCollection[field.id] && !dataCollection[field.id].value) {
          dataCollection[field.id].value = field.setDefaultValue();
          setDataCollection(dataCollection);
        }
      }
    });
  }, [dataCollection]);

  return (
    <>
      <TableRender
        isValid={isValid}
        level={level}
        fields={fields}
        currentDataCollection={dataCollection}
        onCurrentDataCollectionChange={collection =>
          handleCurrentDataCollectionChange(collection)
        }
        onAddToCollection={() => {
          onAddToCollection(dataCollection, level, parentUniqueId);
          setDataCollection(initInputForm(fields, parentUniqueId));
        }}
        onRemoveDataCollection={onRemoveDataCollection}
        onChangeDataCollection={onChangeDataCollection}
        dataCollections={dataCollections}
        toggleContainer={toggleContainer}
      />
      <div className={styles.panelActions}>
        <PrimaryButton
          text="Save"
          disabled={!isValid}
          styles={{ root: { marginRight: 15 } }}
          onClick={() => {
            onAddToCollection(dataCollection, level, parentUniqueId);
            setDataCollection(initInputForm(fields, parentUniqueId));
          }}
        />
        <DefaultButton text="Cancel" onClick={onPanelDismiss} />
      </div>
    </>
  );
};
