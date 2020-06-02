import * as React from "react";
import {
  Panel,
  PanelType,
  DefaultButton,
  IconButton,
  Separator,
} from "office-ui-fabric-react";
import { MenuDataCollectionsContext } from "../context/MenuDataCollectionsContext";
import { TableRender } from "./TableRender";
import { getDataCollectionByLevel } from "../utils/getDataCollectionByLevel";
import { IInputsCollection } from "../interfaces/IInputsCollection";
import { validateFields } from "../utils/validate";

import styles from "../styles/MenuDataCollection.module.scss";

export const MenuDataCollectionsBuilderPanel: React.FC = (): JSX.Element => {
  const {
    navigateLevelUp,
    webPartPropertyBtnLabel,
    levelTitle,
    level,
    fields,
    parentUniqueId,
    onWebPartPropsChanged,
    dataCollections,
    inputFormValuesCollection,
    onChangeInputFieldValue,
  } = React.useContext(MenuDataCollectionsContext);

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isValid, setIsValid] = React.useState(false);

  const onRenderHeader = (): JSX.Element => {
    return level !== 1 ? (
      <div className={styles.panelBuilderTitle}>
        <IconButton
          onClick={() => navigateLevelUp()}
          iconProps={{ iconName: "ChevronLeft" }}
          styles={{ icon: { height: 20, fontSize: 30 } }}
        />
        <span
          style={{ marginLeft: 10 }}
        >{`Submenu builder for : ${levelTitle}`}</span>
      </div>
    ) : (
      <span className={styles.panelBuilderTitle}>Menu builder</span>
    );
  };

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

  React.useEffect(() => {
    onWebPartPropsChanged(dataCollections);
  }, [dataCollections]);

  return (
    <div>
      <DefaultButton
        text={webPartPropertyBtnLabel}
        onClick={() => setIsOpen(true)}
      />
      <Panel
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        type={PanelType.large}
        closeButtonAriaLabel="Close"
        onRenderHeader={onRenderHeader}
      >
        <div className={styles.menuDataCollectionPanelTable}>
          <Separator />
          <TableRender
            isValid={isValid}
            inputFormValuesCollection={inputFormValuesCollection}
            dataCollections={getDataCollectionByLevel(
              dataCollections,
              level,
              parentUniqueId
            )}
          />
          <div className={styles.panelActions}>
            <DefaultButton text="Cancel" onClick={() => setIsOpen(false)} />
          </div>
        </div>
      </Panel>
    </div>
  );
};
