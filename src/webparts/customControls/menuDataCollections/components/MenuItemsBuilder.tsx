import * as React from "react";
import { TableRender } from "./TableRender";
import { initInputForm } from "../utils/initInputForm";
import { IMenuItemsBuilderProps } from "../interfaces/IMenuItemsBuilderProps";
import { IInputsCollection } from "../interfaces/IInputsCollection";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react";
import styles from "../styles/MenuDataCollection.module.scss";
import { validateFields, validateCollections } from "../utils/validate";
import { MenuDataCollectionsContextProvider } from "../context/MenuDataCollectionsContext";

export const MenuItemsBuilder: React.FC<IMenuItemsBuilderProps> = ({
  level,
  parentUniqueId,
  fields,
  dataCollections,
  toggleContainer,
  onAddToCollection,
  onRemoveDataCollection,
  onPanelDismiss,
  onChangeDataCollection,
}): JSX.Element => {
  const [inputsCollection, setInputsCollection] = React.useState<
    IInputsCollection
  >({} as IInputsCollection);

  const [isValid, setIsValid] = React.useState(false);

  const onInputsCollectionChange = (inputs: IInputsCollection): void => {
    setInputsCollection(inputs);
  };

  const validate = (inputs: IInputsCollection): void => {
    // const existingDataCollection = dataCollections.find(dC=> dC.uniqueId === .)
    // validateCollections(inputs, )

    setIsValid(validateFields(inputs));
  };

  // const getDataCollectionUniqueId = () => {
  //   const id = Object.entries(currentDataCollection).find(
  //     obj => !obj[1].uniqueId
  //   );
  // };

  React.useEffect(() => {
    setInputsCollection(initInputForm(fields, parentUniqueId));
  }, []);

  const setDefaultValue = React.useCallback(() => {
    fields.map((field) => {
      if (field.type === "custom") {
        if (inputsCollection[field.id] && !inputsCollection[field.id].value) {
          inputsCollection[field.id].value = field.setDefaultValue();
          setInputsCollection(inputsCollection);
        }
      }
    });
  }, [inputsCollection]);

  React.useEffect(() => {
    validate(inputsCollection);
    setDefaultValue();
  }, []);

  return (
    <MenuDataCollectionsContextProvider {...{ level, fields }}>
      <TableRender
        isValid={isValid}
        level={level}
        fields={fields}
        inputsCollection={inputsCollection}
        onInputsCollectionChange={(collection) =>
          onInputsCollectionChange(collection)
        }
        onAddToCollection={() => {
          onAddToCollection(inputsCollection, level, parentUniqueId);
          setInputsCollection(initInputForm(fields, parentUniqueId));
        }}
        onRemoveDataCollection={onRemoveDataCollection}
        onChangeDataCollection={onChangeDataCollection}
        dataCollections={dataCollections}
        toggleContainer={toggleContainer}
      />
      <div className={styles.panelActions}>
        <PrimaryButton
          text="Save"
          disabled={false}
          styles={{ root: { marginRight: 15 } }}
          onClick={() => {
            onAddToCollection(inputsCollection, level, parentUniqueId);
            setInputsCollection(initInputForm(fields, parentUniqueId));
          }}
        />
        <DefaultButton text="Cancel" onClick={onPanelDismiss} />
      </div>
    </MenuDataCollectionsContextProvider>
  );
};
