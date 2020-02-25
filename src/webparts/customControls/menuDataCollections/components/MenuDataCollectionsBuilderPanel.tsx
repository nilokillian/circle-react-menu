import * as React from "react";
import {
  Panel,
  PanelType,
  DefaultButton,
  PrimaryButton,
  FocusZone,
  FocusZoneDirection,
  IconButton,
  Separator
} from "office-ui-fabric-react";

import styles from "../styles/MenuDataCollection.module.scss";
import {
  IPropertyMenuDataCollectionsFields,
  CustomMenuDataCollectionFieldType
} from "../propertyMenuDataCollections";
import { FirstLevelBuilder } from "./FirstLevelBuilder";
import { SecondLevelBuilder } from "./SecondLevelBuilder";

export interface IMenuDataCollectionsBuilderPanelProps {
  key: string;
  label: string;
  value: any[];
  fields: IPropertyMenuDataCollectionsFields[];
  onChanged: () => void;
}

export interface IDataCollections {
  fields: ICurrentDataCollection;
  relationId?: string;
  level: number;
}

export interface ICurrentDataCollection {
  [key: string]: {
    value: string | boolean;
    uniqueId: string;
    type: string;
  };
}

export interface IContaners {
  firstLvl: boolean;
  secondLvl: boolean;
  thirdLvl: boolean;
}

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
  const openPanel = () => setIsOpen(true);
  const dismissPanel = () => {
    setIsOpen(false);
  };

  const containerToggle = (
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
  ) => {
    let obj = {
      fields: currentDataCollection,
      relationId: uniqueId,
      level: level
    } as IDataCollections;

    setDataCollections([...dataCollections, obj]);
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
      <DefaultButton text="Standard" onClick={openPanel} />
      <Panel
        isOpen={isOpen}
        onDismiss={dismissPanel}
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
              containerToggle={containerToggle}
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
              containerToggle={containerToggle}
              onAddToCollection={onAddToCollection}
            />
          )}
          <div className={styles.panelActions}>
            <PrimaryButton
              text="Save"
              onClick={() => getContainerTitle()}
              styles={{ root: { marginRight: 15 } }}
            />
            <DefaultButton text="Cancel" onClick={dismissPanel} />
          </div>
        </div>
      </Panel>
    </div>
  );
};
