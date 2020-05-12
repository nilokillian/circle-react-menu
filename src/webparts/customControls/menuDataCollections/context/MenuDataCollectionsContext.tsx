import * as React from "react";
import { IInputsCollection } from "../interfaces/IInputsCollection";
import { initInputForm } from "../utils/initInputForm";
import { ID } from "../utils/generateId";
import {
  Actions,
  IMenuDataCollectionsContext,
} from "./IMenuDataCollectionsContextTypes";
import { usePreviousState } from "../hooks/usePreviousState";
import { IDataCollections } from "../interfaces/IDataCollections";
import { reducer } from "./reducer";

const MenuDataCollectionsContext = React.createContext(
  {} as IMenuDataCollectionsContext
);

const MenuDataCollectionsContextProvider = (props: any) => {
  //props from webpart
  const { fields, value, btnLabel, onWebPartPropsChanged } = props;

  const initialState = {
    currentLevel: 1,
    currentParentUniqueId: "",
    currentLevelTitle: "",
    inputFormValuesCollection: initInputForm(fields), //creating scaleton for inputs based on webpart props fields
    dataCollections: value as IDataCollections[], //value = dataCollections from wepbart props
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const parentPrevState = usePreviousState({
    title: state.currentLevelTitle,
    uniqueId: state.currentParentUniqueId,
  });

  const removeDataCollection = (dataCollectionId: string): void => {
    const { dataCollections } = state;
    const newDataCollections: IDataCollections[] = [];
    const currentDataCollectionToRemove = dataCollections.find(
      (d) => d.uniqueId === dataCollectionId
    );

    if (currentDataCollectionToRemove) {
      switch (currentDataCollectionToRemove.level) {
        case 1:
          const dataCollectionsL2Ids = dataCollections
            .filter((d) => d.relationId === dataCollectionId)
            .map((filteredData) => filteredData.uniqueId);

          const dataCollectionsL3Removed = dataCollections.filter(
            (d) =>
              d.relationId !==
              dataCollectionsL2Ids.find((id) => id === d.relationId)
          );

          newDataCollections.push(
            ...dataCollectionsL3Removed.filter(
              (d) =>
                d.uniqueId !== dataCollectionId &&
                d.relationId !== dataCollectionId
            )
          );
          break;

        case 2:
          newDataCollections.push(
            ...dataCollections.filter(
              (d) =>
                d.uniqueId !== dataCollectionId &&
                d.relationId !== dataCollectionId
            )
          );

          break;

        case 3:
          newDataCollections.push(
            ...dataCollections.filter((d) => d.uniqueId !== dataCollectionId)
          );

          break;

        default:
          newDataCollections.push(...dataCollections);
          break;
      }
    }

    dispatch({
      type: Actions.REMOVE_DATA_COLLECTION,
      payload: newDataCollections,
    });
  };

  const onChangeDataCollection = (
    dataCollectionId: string,
    fieldId: string,
    newValue: string
  ): void => {
    const { dataCollections } = state;

    for (let dataCollection of dataCollections) {
      if (dataCollection.uniqueId === dataCollectionId) {
        dataCollection.fields[fieldId].value = newValue;
      }
    }

    dispatch({
      type: Actions.ON_CHANGE_DATA_COLLECTION,
      payload: dataCollections,
    });
  };

  const onChangeInputFieldValue = (inputData: IInputsCollection): void => {
    dispatch({
      type: Actions.ON_CHANGE_INPUT_VALUE,
      payload: inputData,
    });
  };

  // add new collection to dataCollections array
  const addToDataCollections = (level: number): void => {
    dispatch({
      type: Actions.ADD_TO_DATA_COLLECTIONS,
      payload: {
        inputFormValuesCollection: initInputForm(fields),
        dataCollections: [
          ...state.dataCollections,
          {
            fields: state.inputFormValuesCollection,
            uniqueId: ID(),
            relationId: state.currentParentUniqueId,
            level,
          },
        ],
      },
    });
  };

  // toggle level, depth + 1 / filter dataCollections correspondingly / clear inputs
  const navigateLevelDown = (
    parentUniqueId: string,
    levelTitle: string
  ): void => {
    dispatch({
      type: Actions.NAVIGATE_LEVEL_DOWN,
      payload: {
        currentLevel: state.currentLevel + 1,
        levelTitle,
        parentUniqueId: parentUniqueId,
        inputFormValuesCollection: initInputForm(fields),
      },
    });
  };

  // toggle level, depth - 1 / filter dataCollections correspondingly / clear inputs
  const navigateLevelUp = (): void => {
    dispatch({
      type: Actions.NAVIGATE_LEVEL_UP,
      payload: {
        levelTitle: parentPrevState.title,
        level:
          state.currentLevel !== 1
            ? state.currentLevel - 1
            : state.currentLevel,
        parentUniqueId: parentPrevState.uniqueId,
        inputFormValuesCollection: initInputForm(fields),
      },
    });
  };

  return (
    <MenuDataCollectionsContext.Provider
      value={{
        level: state.currentLevel,
        levelTitle: state.currentLevelTitle,
        parentUniqueId: state.currentParentUniqueId,
        fields,
        dataCollections: state.dataCollections,
        inputFormValuesCollection: state.inputFormValuesCollection,
        onChangeInputFieldValue,
        onChangeDataCollection,
        navigateLevelDown,
        navigateLevelUp,
        addToDataCollections,
        removeDataCollection,
        webPartPropertyBtnLabel: btnLabel,
        onWebPartPropsChanged,
      }}
    >
      {props.children}
    </MenuDataCollectionsContext.Provider>
  );
};

export { MenuDataCollectionsContext, MenuDataCollectionsContextProvider };
