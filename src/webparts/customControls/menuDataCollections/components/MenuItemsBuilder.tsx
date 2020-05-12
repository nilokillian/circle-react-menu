import * as React from "react";
import { MenuDataCollectionsContext } from "../context/MenuDataCollectionsContext";
import { TableRender } from "./TableRender";
import { IMenuItemsBuilderProps } from "../interfaces/IMenuItemsBuilderProps";
import { IInputsCollection } from "../interfaces/IInputsCollection";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react";
import styles from "../styles/MenuDataCollection.module.scss";
import { validateFields, validateCollections } from "../utils/validate";
import { getDataCollectionByLevel } from "../utils/getDataCollectionByLevel";

export const MenuItemsBuilder: React.FC<IMenuItemsBuilderProps> = ({
  onPanelDismiss,
}): JSX.Element => {
  const {
    level,
    parentUniqueId,
    fields,
    inputFormValuesCollection,
    dataCollections,
    addToDataCollections,
    onChangeInputFieldValue,
  } = React.useContext(MenuDataCollectionsContext);

  const [isValid, setIsValid] = React.useState(false);

  const validate = (inputs: IInputsCollection): void => {
    // const existingDataCollection = dataCollections.find(dC=> dC.uniqueId === .)
    // validateCollections(inputs, )

    setIsValid(validateFields(inputs));
  };

  const setDefaultValue = React.useCallback(() => {
    fields.map((field) => {
      if (field.type === "custom") {
        if (
          inputFormValuesCollection[field.id] &&
          !inputFormValuesCollection[field.id].value
        ) {
          inputFormValuesCollection[field.id].value = field.setDefaultValue();
          onChangeInputFieldValue(inputFormValuesCollection);
        }
      }
    });
  }, [inputFormValuesCollection]);

  React.useEffect(() => {
    validate(inputFormValuesCollection);
    setDefaultValue();
  }, []);

  return (
    <>
      <TableRender
        isValid={isValid}
        level={level}
        // onRemoveDataCollection={() => console.log("!")}
        // onChangeDataCollection={() => console.log("!")}
        inputFormValuesCollection={inputFormValuesCollection}
        dataCollections={getDataCollectionByLevel(
          dataCollections,
          level,
          parentUniqueId
        )}
      />
      <div className={styles.panelActions}>
        <PrimaryButton
          text="Save"
          disabled={false}
          styles={{ root: { marginRight: 15 } }}
          onClick={() => addToDataCollections(level, parentUniqueId)}
        />
        <DefaultButton text="Cancel" onClick={onPanelDismiss} />
      </div>
    </>
  );
};
