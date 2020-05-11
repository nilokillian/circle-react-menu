import { IInputsCollection } from "../interfaces/IInputsCollection";
import { IDataCollections } from "../interfaces/IDataCollections";

export enum Actions {
  ON_CHANGE_INPUT_VALUE = "ON_CHANGE_INPUT_VALUE",
  ON_CHANGE_DATA_COLLECTION = "ON_CHANGE_DATA_COLLECTION",
  ADD_TO_DATA_COLLECTIONS = "ADD_TO_DATA_COLLECTIONS",
  REMOVE_FROM_DATA_COLLECTIONS = "REMOVE_FROM_DATA_COLLECTIONS",
  //   SET_LEVEL_TITLE = "SET_LEVEL_TITLE ",
  //   SET_PARENT_UNIQUE_ID = "SET_PARENT_UNIQUE_ID",
  //   SET_CURRENT_LEVEL = "SET_CURRENT_LEVEL",
  NAVIGATE_LEVEL_DOWN = "NAVIGATE_LEVEL_DOWN",
  NAVIGATE_LEVEL_UP = "NAVIGATE_LEVEL_UP",
}

export interface IMenuDataCollectionsContext {
  navigateLevelDown: (uniqueId: string, inputValue: string) => void;
  navigateLevelUp: (uniqueId: string, inputValue: string) => void;
  inputFormValuesCollection: IInputsCollection;
  dataCollections: IDataCollections[];
  onChangeInputFieldValue: (inputData: IInputsCollection) => void;
  onChangeDataCollection: (inputData: any) => void;
  addToDataCollections: (
    inputData: IInputsCollection,
    level: number,
    parentUniqueId?: string
  ) => void;
}

type NavigateLevelDownAction = {
  type: Actions.NAVIGATE_LEVEL_DOWN;
  payload: { currentLevel: number; uniqueId: string; inputValue: string };
};

type NavigateLevelUpAction = {
  type: Actions.NAVIGATE_LEVEL_UP;
  payload: { currentLevel: number; uniqueId: string; inputValue: string };
};

type OnChangeInputValueAction = {
  type: Actions.ON_CHANGE_INPUT_VALUE;
  payload: IInputsCollection;
};

type AddToDataCollections = {
  type: Actions.ADD_TO_DATA_COLLECTIONS;
  payload: IDataCollections;
};

type OnChangeDataCollection = {
  type: Actions.ON_CHANGE_DATA_COLLECTION;
  payload: IDataCollections[];
};

export type IActions =
  | OnChangeInputValueAction
  | AddToDataCollections
  | OnChangeDataCollection
  | NavigateLevelDownAction
  | NavigateLevelUpAction;

export interface IMenuDataState {
  currentLevel: number;
  currentLevelTitle: string;
  parentUniqueId: string;
  inputFormValuesCollection: IInputsCollection;
  dataCollections: IDataCollections[];
}
