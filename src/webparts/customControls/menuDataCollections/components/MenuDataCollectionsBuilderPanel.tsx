import * as React from "react";
import {
  Panel,
  PanelType,
  DefaultButton,
  IconButton,
  Separator,
} from "office-ui-fabric-react";
import styles from "../styles/MenuDataCollection.module.scss";
import { MenuItemsBuilder } from "./MenuItemsBuilder";
import { MenuDataCollectionsContext } from "../context/MenuDataCollectionsContext";

export const MenuDataCollectionsBuilderPanel: React.FC = (): JSX.Element => {
  const {
    navigateLevelUp,
    webPartPropertyBtnLabel,
    levelTitle,
    level,
    onWebPartPropsChanged,
    dataCollections,
  } = React.useContext(MenuDataCollectionsContext);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  // const toggleMenuBuilderLevel = (
  //   uniqueId: string,
  //   titleInputValue: string
  // ) => {
  //   setTitleValue(titleInputValue);
  //   setParentUniqueId(uniqueId);
  //   setCurrentLevel((prevLevel) => prevLevel + 1);
  // };

  // const onRemoveFromDataCollections = (dataCollectionId: string): void => {
  //   const newDataCollections: IDataCollections[] = [];
  //   const currentDataCollectionToRemove = dataCollections.find(
  //     (d) => d.uniqueId === dataCollectionId
  //   );

  //   if (currentDataCollectionToRemove) {
  //     switch (currentDataCollectionToRemove.level) {
  //       case 1:
  //         const dataCollectionsL2Ids = dataCollections
  //           .filter((d) => d.relationId === dataCollectionId)
  //           .map((filteredData) => filteredData.uniqueId);

  //         const dataCollectionsL3Removed = dataCollections.filter(
  //           (d) =>
  //             d.relationId !==
  //             dataCollectionsL2Ids.find((id) => id === d.relationId)
  //         );

  //         newDataCollections.push(
  //           ...dataCollectionsL3Removed.filter(
  //             (d) =>
  //               d.uniqueId !== dataCollectionId &&
  //               d.relationId !== dataCollectionId
  //           )
  //         );
  //         break;

  //       case 2:
  //         newDataCollections.push(
  //           ...dataCollections.filter(
  //             (d) =>
  //               d.uniqueId !== dataCollectionId &&
  //               d.relationId !== dataCollectionId
  //           )
  //         );

  //         break;

  //       case 3:
  //         newDataCollections.push(
  //           ...dataCollections.filter((d) => d.uniqueId !== dataCollectionId)
  //         );

  //         break;

  //       default:
  //         newDataCollections.push(...dataCollections);
  //         break;
  //     }
  //   }

  //   setDataCollections(newDataCollections);
  // };

  // const onChangeDataCollections = (
  //   dataCollectionId: string,
  //   fieldId: string,
  //   newValue: string | boolean
  // ): void => {
  //   for (let dataCollection of dataCollections) {
  //     if (dataCollection.uniqueId === dataCollectionId) {
  //       dataCollection.fields[fieldId].value = newValue;
  //     }
  //   }

  //   setDataCollections([...dataCollections]);
  // };

  // const handleClickBack = () => {
  //   setCurrentLevel((prevCurrentLevel) =>
  //     prevCurrentLevel !== 1 ? prevCurrentLevel - 1 : prevCurrentLevel
  //   );
  //   handleParentUniqueId();
  //   navigateLevelUp("test");
  // };

  // const handleOnClose = (): void => {
  //   setIsOpen(false);
  //   setParentUniqueId("");
  //   setTitleValue("");
  // };

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

  // React.useEffect(() => {
  //   if (currentLevel === 1) {
  //     setParentUniqueId("");
  //     setTitleValue("");
  //   }
  // }, [currentLevel]);

  // useEffect(() => {
  //   setDataCollections(value);
  // }, [value]);

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
          <MenuItemsBuilder onPanelDismiss={() => setIsOpen(false)} />
        </div>
      </Panel>
    </div>
  );
};
