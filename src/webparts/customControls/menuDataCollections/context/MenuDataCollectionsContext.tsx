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
import { usePreviousState } from "../hooks/usePreviousState";
import { IDataCollections } from "../interfaces/IDataCollections";

const reducer = (state: IMenuDataState, action: IActions) => {
  switch (action.type) {
    case Actions.RESET_FIELDS_INPUTS:
      return {
        ...state,
        inputFormValuesCollection: action.payload,
      };

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
        inputFormValuesCollection: action.payload.inputFormValuesCollection,
        dataCollections: action.payload.dataCollections,
      };

    case Actions.NAVIGATE_LEVEL_DOWN:
      return {
        ...state,
        currentLevel: action.payload.currentLevel,
        currentParentUniqueId: action.payload.parentUniqueId,
        currentLevelTitle: action.payload.inputValue,
      };

    case Actions.NAVIGATE_LEVEL_UP:
      return {
        ...state,
        currentLevel: action.payload.level,
        currentParentUniqueId:
          action.payload.level === 1 ? "" : action.payload.parentUniqueId,
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
  const { fields, value, btnLabel, onWebPartPropsChanged } = props;
  const initialState = {
    currentLevel: 1,
    currentParentUniqueId: "",
    currentLevelTitle: "",
    inputFormValuesCollection: initInputForm(fields),
    dataCollections: value as IDataCollections[],
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const prevParentUniqueIdState = usePreviousState(state.currentParentUniqueId);

  const resetFieldsInputs = (): void => {
    dispatch({
      type: Actions.RESET_FIELDS_INPUTS,
      payload: initInputForm(fields),
    });
  };

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

  const addToDataCollections = (level: number, parentUniqueId = ""): void => {
    dispatch({
      type: Actions.ADD_TO_DATA_COLLECTIONS,
      payload: {
        inputFormValuesCollection: initInputForm(fields),
        dataCollections: [
          ...state.dataCollections,
          {
            fields: state.inputFormValuesCollection,
            uniqueId: ID(),
            relationId: parentUniqueId,
            level,
          },
        ],
      },
    });

   
  };

  const navigateLevelDown = (
    parentUniqueId: string,
    inputValue: string
  ): void => {
    dispatch({
      type: Actions.NAVIGATE_LEVEL_DOWN,
      payload: {
        currentLevel: state.currentLevel + 1,
        inputValue,
        parentUniqueId: parentUniqueId,
      },
    });
  };

  const navigateLevelUp = (inputValue: string): void => {
    dispatch({
      type: Actions.NAVIGATE_LEVEL_UP,
      payload: {
        inputValue,
        level:
          state.currentLevel !== 1
            ? state.currentLevel - 1
            : state.currentLevel,
        parentUniqueId: prevParentUniqueIdState,
      },
    });
  };
  return (
    <MenuDataCollectionsContext.Provider
      value={{
        level: state.currentLevel,
        parentUniqueId: state.currentParentUniqueId,
        fields,
        dataCollections: state.dataCollections,
        inputFormValuesCollection: state.inputFormValuesCollection,
        onChangeInputFieldValue,
        onChangeDataCollection,
        navigateLevelDown,
        navigateLevelUp,
        addToDataCollections,
        resetFieldsInputs,
        webPartPropertyBtnLabel: btnLabel,
        onWebPartPropsChanged,
      }}
    >
      {props.children}
    </MenuDataCollectionsContext.Provider>
  );
};

export { MenuDataCollectionsContext, MenuDataCollectionsContextProvider };
