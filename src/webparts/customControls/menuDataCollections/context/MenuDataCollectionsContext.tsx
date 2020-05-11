import * as React from "react";
import { IInputsCollection } from "../interfaces/IInputsCollection";
import { initInputForm } from "../utils/initInputForm";
import { ID } from "../utils/generateId";
import {
  IMenuDataState,
  IActions,
  Actions,
  IMenuDataCollectionsContext,
} from "./IMenuDataCollectionsContextTypes";

const reducer = (state: IMenuDataState, action: IActions) => {
  switch (action.type) {
    case Actions.ON_CHANGE_INPUT_VALUE:
      return {
        ...state,
        inputFormValuesCollection: action.payload,
      };

    case Actions.ON_CHANGE_DATA_COLLECTION:
      return {
        ...state,
        dataCollections: action.payload,
      };

    case Actions.ADD_TO_DATA_COLLECTIONS:
      return {
        ...state,
        dataCollections: action.payload,
      };
    case Actions.NAVIGATE_LEVEL_DOWN:
      return {
        ...state,
        parentUniqueId: action.payload.uniqueId,
        currentLevelTitle: action.payload.inputValue,
      };

    case Actions.NAVIGATE_LEVEL_UP:
      return {
        ...state,
        parentUniqueId: action.payload.uniqueId,
        currentLevelTitle: action.payload.inputValue,
      };

    default:
      return state;
  }
};

const MenuDataCollectionsContext = React.createContext(
  {} as IMenuDataCollectionsContext
);
const MenuDataCollectionsContextProvider = (props: any) => {
  const initialState = {
    currentLevel: 1,
    parentUniqueId: "",
    currentLevelTitle: "",
    inputFormValuesCollection: initInputForm(props.fields, props.level),
    dataCollections: [],
  };
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onChangeDataCollection = (inputData: any): void => {
    dispatch({
      type: Actions.ON_CHANGE_DATA_COLLECTION,
      payload: inputData,
    });
  };
  const onChangeInputFieldValue = (inputData: IInputsCollection): void => {
    dispatch({
      type: Actions.ON_CHANGE_INPUT_VALUE,
      payload: inputData,
    });
  };

  const addToDataCollections = (
    inputsCollection: IInputsCollection,
    level: number,
    parentUniqueId = ""
  ): void => {
    dispatch({
      type: Actions.ADD_TO_DATA_COLLECTIONS,
      payload: {
        fields: inputsCollection,
        uniqueId: ID(),
        relationId: parentUniqueId,
        level,
      },
    });
  };

  const navigateLevelDown = (uniqueId: string, inputValue: string): void => {
    dispatch({
      type: Actions.NAVIGATE_LEVEL_DOWN,
      payload: {
        currentLevel: state.currentLevel + 1,
        inputValue,
        uniqueId,
      },
    });
  };

  const navigateLevelUp = (uniqueId: string, inputValue: string): void => {
    dispatch({
      type: Actions.NAVIGATE_LEVEL_DOWN,
      payload: {
        currentLevel:
          state.currentLevel !== 1
            ? state.currentLevel - 1
            : state.currentLevel,
        inputValue,
        uniqueId,
      },
    });
  };

  return (
    <MenuDataCollectionsContext.Provider
      value={{
        navigateLevelDown,
        navigateLevelUp,
        dataCollections: state.dataCollections,
        inputFormValuesCollection: state.inputFormValuesCollection,
        onChangeInputFieldValue,
        onChangeDataCollection,
        addToDataCollections,
      }}
      {...props}
    />
  );
};

export { MenuDataCollectionsContext, MenuDataCollectionsContextProvider };
