import * as React from "react";
import {
  Panel,
  PanelType,
  DefaultButton,
  PrimaryButton,
  IconButton,
  Separator
} from "office-ui-fabric-react";
import styles from "../styles/MenuDataCollection.module.scss";
import { FirstLevelBuilder } from "./FirstLevelBuilder";
import { SecondLevelBuilder } from "./SecondLevelBuilder";
import { IMenuDataCollectionsBuilderPanelProps } from "../interfaces/IMenuDataCollectionsBuilderPanelProps";
import { IDataCollections } from "../interfaces/IDataCollections";
import { ICurrentDataCollection } from "../interfaces/ICurrentDataCollection";
import { IContaners } from "../interfaces/IContaners";

export const MenuDataCollectionsBuilderPanel: React.FC<IMenuDataCollectionsBuilderPanelProps> = (
  props
): JSX.Element => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [parentUniqueId, setParentUniqueId] = React.useState<string>("");
  const [titleValue, setTitleValue] = React.useState<string>("");
  const [contaners, setContaners] = React.useState<IContaners>({
    firstLvl: true,
    secondLvl: false,
    thirdLvl: false
  });
  const [dataCollections, setDataCollections] = React.useState<
    IDataCollections[]
  >([]);

  const toggleContainer = (
    contName: string,
    parentUniqueId: string,
    titleValue: string
  ) => {
    contaners[contName] = !contaners[contName];

    if (contName === "firstLvl") {
      contaners["secondLvl"] = true;
    }
    setTitleValue(titleValue);
    setParentUniqueId(parentUniqueId);
    setContaners({ ...contaners });
  };

  const getContainerTitle = () => {
    let activeContainer: string;

    for (let title in contaners) {
      if (contaners[title]) {
        activeContainer = title;
      }
    }

    return activeContainer;
  };

  const onUpdate = () => {
    console.log("onUpdate1");
  };

  const onAddToCollection = (
    currentDataCollection: ICurrentDataCollection,
    level: number,
    uniqueId: string
  ): void => {
    setDataCollections([
      ...dataCollections,
      {
        fields: currentDataCollection,
        relationId: uniqueId,
        level: level
      } as IDataCollections
    ]);
  };

  const onRenderHeader = (): JSX.Element => {
    return titleValue ? (
      <div className={styles.panelBuilderTitle}>
        <IconButton
          onClick={() => {
            contaners.secondLvl = false;
            contaners.firstLvl = true;
            setTitleValue("");
            setContaners({ ...contaners });
          }}
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

  return (
    <div>
      <DefaultButton text={props.btnLabel} onClick={() => setIsOpen(true)} />
      <Panel
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        type={PanelType.large}
        closeButtonAriaLabel="Close"
        onRenderHeader={onRenderHeader}
      >
        <div className={styles.menuDataCollectionPanelTable}>
          <Separator />
          {contaners["firstLvl"] && (
            <FirstLevelBuilder
              fields={props.fields}
              dataCollections={dataCollections.filter(d => d.level === 1)}
              toggleContainer={toggleContainer}
              onAddToCollection={onAddToCollection}
            />
          )}
          {contaners["secondLvl"] && (
            <SecondLevelBuilder
              parentUniqueId={parentUniqueId}
              fields={props.fields}
              dataCollections={dataCollections.filter(
                d => d.level === 2 && d.relationId === parentUniqueId
              )}
              toggleContainer={toggleContainer}
              onAddToCollection={onAddToCollection}
            />
          )}
          <div className={styles.panelActions}>
            <PrimaryButton
              text="Save"
              onClick={() => getContainerTitle()}
              styles={{ root: { marginRight: 15 } }}
            />
            <DefaultButton text="Cancel" onClick={() => setIsOpen(false)} />
          </div>
        </div>
      </Panel>
    </div>
  );
};
