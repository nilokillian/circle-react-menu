import * as React from "react";
import { useEffect } from "react";
import {
  Panel,
  PanelType,
  DefaultButton,
  IconButton,
  Separator
} from "office-ui-fabric-react";
import styles from "../styles/MenuDataCollection.module.scss";
import { MenuItemsBuilder } from "./MenuItemsBuilder";
import { IMenuDataCollectionsBuilderPanelProps } from "../interfaces/IMenuDataCollectionsBuilderPanelProps";
import { IDataCollections } from "../interfaces/IDataCollections";
import { ICurrentDataCollection } from "../interfaces/ICurrentDataCollection";
import { ID } from "../utils/generateId";
import { usePreviousState } from "../hooks/usePreviousState";

export const MenuDataCollectionsBuilderPanel: React.FC<IMenuDataCollectionsBuilderPanelProps> = (
  props
): JSX.Element => {
  const { value } = props;
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [parentUniqueId, setParentUniqueId] = React.useState<string>("");
  const [titleValue, setTitleValue] = React.useState<string>("");
  const [currentLevel, setCurrentLevel] = React.useState<number>(1);
  const [dataCollections, setDataCollections] = React.useState<
    IDataCollections[]
  >(() => value);

  const getPreviousState = usePreviousState(parentUniqueId);

  const toggleContainer = (uniqueId: string, titleInputValue: string) => {
    setTitleValue(titleInputValue);
    setParentUniqueId(uniqueId);
    setCurrentLevel(prevLevel => prevLevel + 1);
  };

  const onAddToCollection = (
    currentDataCollection: ICurrentDataCollection,
    level: number,
    relationId?: string
  ): void => {
    setDataCollections([
      ...dataCollections,
      {
        fields: currentDataCollection,
        uniqueId: ID(),
        relationId: relationId ? relationId : "",
        level: level
      } as IDataCollections
    ]);
  };

  const onRemoveDataCollections = (dataCollectionId: string): void => {
    const newDataCollections: IDataCollections[] = [];
    const currentDataCollectionToRemove = dataCollections.find(
      d => d.uniqueId === dataCollectionId
    );

    if (currentDataCollectionToRemove) {
      switch (currentDataCollectionToRemove.level) {
        case 1:
          const dataCollectionsL2Ids = dataCollections
            .filter(d => d.relationId === dataCollectionId)
            .map(filteredData => filteredData.uniqueId);

          const dataCollectionsL3Removed = dataCollections.filter(
            d =>
              d.relationId !==
              dataCollectionsL2Ids.find(id => id === d.relationId)
          );

          newDataCollections.push(
            ...dataCollectionsL3Removed.filter(
              d =>
                d.uniqueId !== dataCollectionId &&
                d.relationId !== dataCollectionId
            )
          );
          break;

        case 2:
          newDataCollections.push(
            ...dataCollections.filter(
              d =>
                d.uniqueId !== dataCollectionId &&
                d.relationId !== dataCollectionId
            )
          );

          break;

        case 3:
          newDataCollections.push(
            ...dataCollections.filter(d => d.uniqueId !== dataCollectionId)
          );

          break;

        default:
          newDataCollections.push(...dataCollections);
          break;
      }
    }

    setDataCollections(newDataCollections);
  };

  const onChangeDataCollections = (
    dataCollectionId: string,
    fieldName: string,
    newValue: string | boolean
  ): void => {
    const currentDataCollectionToChange = dataCollections.find(
      d => d.uniqueId === dataCollectionId
    );

    currentDataCollectionToChange.fields[fieldName].value = newValue;

    const newDataCollections = dataCollections
      .filter(dC => dC.uniqueId !== dataCollectionId)
      .concat(currentDataCollectionToChange);

    setDataCollections(newDataCollections);
  };

  const getCurrentDataCollection = (subLevel: number): IDataCollections[] => {
    return subLevel === 1
      ? dataCollections.filter(d => d.level === subLevel)
      : dataCollections.filter(
          d => d.level === subLevel && d.relationId === parentUniqueId
        );
  };

  const handleParentUniqueId = React.useCallback(() => {
    setParentUniqueId(getPreviousState);
  }, [parentUniqueId]);

  const handleClickBack = () => {
    setCurrentLevel(prevCurrentLevel =>
      prevCurrentLevel !== 1 ? prevCurrentLevel - 1 : prevCurrentLevel
    );
    handleParentUniqueId();
  };

  const handleOnClose = (): void => {
    setIsOpen(false);
    setParentUniqueId("");
    setTitleValue("");
  };

  const onRenderHeader = (): JSX.Element => {
    return currentLevel !== 1 ? (
      <div className={styles.panelBuilderTitle}>
        <IconButton
          onClick={handleClickBack}
          iconProps={{ iconName: "ChevronLeft" }}
          styles={{ icon: { height: 20, fontSize: 30 } }}
        />
        <span
          style={{ marginLeft: 10 }}
        >{`Submenu builder for : ${titleValue}`}</span>
      </div>
    ) : (
      <span className={styles.panelBuilderTitle}>Menu builder</span>
    );
  };

  useEffect(() => {
    if (currentLevel === 1) {
      setParentUniqueId("");
      setTitleValue("");
    }
  }, [currentLevel]);

  useEffect(() => {
    setDataCollections(value);
  }, [value]);

  useEffect(() => {
    props.onChanged(dataCollections);
  }, [dataCollections]);

  return (
    <div>
      <DefaultButton text={props.btnLabel} onClick={() => setIsOpen(true)} />
      <Panel
        isOpen={isOpen}
        onDismiss={handleOnClose}
        type={PanelType.large}
        closeButtonAriaLabel="Close"
        onRenderHeader={onRenderHeader}
      >
        <div className={styles.menuDataCollectionPanelTable}>
          <Separator />
          <MenuItemsBuilder
            level={currentLevel}
            parentUniqueId={currentLevel > 1 ? parentUniqueId : ""}
            fields={props.fields}
            onPanelDismiss={handleOnClose}
            dataCollections={getCurrentDataCollection(currentLevel)}
            toggleContainer={toggleContainer}
            onAddToCollection={onAddToCollection}
            onRemoveDataCollection={onRemoveDataCollections}
            onChangeDataCollection={onChangeDataCollections}
          />
        </div>
      </Panel>
    </div>
  );
};
