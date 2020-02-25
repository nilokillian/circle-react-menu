import * as React from "react";
import styles from "../styles/MenuDataCollection.module.scss";
import { TextField, Checkbox, IconButton } from "office-ui-fabric-react";
import {
  ICurrentDataCollection,
  IDataCollections
} from "./MenuDataCollectionsBuilderPanel";
import { ID } from "../utils/generateId";

export interface ITableRenderProps {
  level: number;
  fields: any[];
  dataCollections: IDataCollections[];
  currentDataCollection: ICurrentDataCollection;
  onCurrentDataCollectionChange: (value: ICurrentDataCollection) => void;
  onAddToCollection: (collection: ICurrentDataCollection, lvl: number) => void;
  onCustomFieldUpdate: () => void;
  containerToggle: (
    value: string,
    parentUniqueId: string,
    titleValue: string
  ) => void;
}

export const TableRender: React.FC<ITableRenderProps> = ({
  dataCollections,
  fields,
  level,
  currentDataCollection,
  onCurrentDataCollectionChange,
  onAddToCollection,
  onCustomFieldUpdate,
  containerToggle
}) => {
  const onTextFieldChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string | boolean
  ): void => {
    const fielId = event.target["name"];

    currentDataCollection[fielId].value = newValue;
    onCurrentDataCollectionChange({ ...currentDataCollection });
  };

  const renderTableHeaders = (): JSX.Element[] => {
    return fields.map(field => (
      <span className={`${styles.tableHead} ${styles.tableCell}`}>
        {field.title}
      </span>
    ));
  };

  const renderFormInputFields = (): JSX.Element => {
    return (
      <>
        {fields.map(field => {
          switch (field.type) {
            case "text":
              return (
                <span className={`${styles.tableCell} ${styles.inputField}`}>
                  <TextField
                    name={field.id}
                    value={
                      currentDataCollection[field.id]
                        ? (currentDataCollection[field.id].value as string)
                        : ""
                    }
                    onChange={onTextFieldChange}
                    required
                  />
                </span>
              );

            case "checkbox":
              return (
                <span className={`${styles.tableCell} ${styles.inputField}`}>
                  <Checkbox
                    name={field.id}
                    checked={
                      currentDataCollection[field.id]
                        ? (currentDataCollection[field.id].value as boolean)
                        : false
                    }
                    onChange={onTextFieldChange}
                  />
                </span>
              );

            case "custom":
              return (
                <span className={`${styles.tableCell} ${styles.inputField}`}>
                  {field.onCustomRender(field.id, "value", onCustomFieldUpdate)}
                </span>
              );
          }
        })}

        <span className={`${styles.tableCell} ${styles.inputField}`}></span>
        <span className={`${styles.tableCell} ${styles.inputField}`}>
          <IconButton
            iconProps={{ iconName: "Add" }}
            onClick={() => onAddToCollection(currentDataCollection, level)}
          />
        </span>
      </>
    );
  };

  const renderDataCollectionsValues = (): JSX.Element[] | JSX.Element => {
    if (dataCollections.length === 0) {
      return (
        <p className={styles.noCollectionData}>No data in your collection.</p>
      );
    }

    return dataCollections.map(data => {
      return (
        <div className={`${styles.tableRow} ${styles.tableFooter}`}>
          {fields.map(field => {
            switch (field.type) {
              case "text":
                return (
                  <span className={`${styles.tableCell} ${styles.inputField}`}>
                    <TextField
                      value={data.fields[field.id].value as string}
                      id={data.fields[field.id].uniqueId}
                      onChange={null}
                      required
                    />
                  </span>
                );

              case "checkbox":
                return (
                  <span className={`${styles.tableCell} ${styles.inputField}`}>
                    <Checkbox
                      id={data.fields[field.id].uniqueId}
                      checked={data.fields[field.id].value as boolean}
                      onChange={null}
                    />
                  </span>
                );

              case "custom":
                return (
                  <span className={`${styles.tableCell} ${styles.inputField}`}>
                    {field.onCustomRender(
                      field.id,
                      "value",
                      onCustomFieldUpdate
                    )}
                  </span>
                );
            }
          })}

          <span className={`${styles.tableCell} ${styles.inputField}`}>
            <IconButton
              iconProps={{ iconName: "WebAppBuilderFragment" }}
              onClick={() =>
                containerToggle(
                  "firstLvl",
                  data.relationId,
                  data.fields["title"].value as string
                )
              }
            />
          </span>

          <span className={`${styles.tableCell} ${styles.inputField}`}>
            <IconButton iconProps={{ iconName: "Cancel" }} onClick={null} />
          </span>
        </div>
      );
    });
  };

  return (
    <div className={styles.table}>
      <div className={`${styles.tableRow} ${styles.tableHead}`}>
        {renderTableHeaders()}
      </div>

      {dataCollections.length > 0 && renderDataCollectionsValues()}
      <div className={`${styles.tableRow} ${styles.tableFooter}`}>
        {renderFormInputFields()}
      </div>
    </div>
  );
};
