import * as React from "react";
import { ID } from "../utils/generateId";
import { TextField, Checkbox, IconButton } from "office-ui-fabric-react";
import { ITableRenderProps } from "../interfaces/ITableRenderProps";
import { MenuDataCollectionsContext } from "../context/MenuDataCollectionsContext";

import styles from "../styles/MenuDataCollection.module.scss";

export const TableRender: React.FC<ITableRenderProps> = ({
  isValid,
  dataCollections,
  inputFormValuesCollection,
}) => {
  const {
    level,
    fields,
    navigateLevelDown,
    addToDataCollections,
    removeDataCollection,
    onChangeInputFieldValue,
    onChangeDataCollection,
  } = React.useContext(MenuDataCollectionsContext);

  const onInputFormValueChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string | boolean
  ): void => {
    const fielId = event.target["name"];
    inputFormValuesCollection[fielId].value = newValue;
    onChangeInputFieldValue(inputFormValuesCollection);
  };

  const onDataCollectionValueChange = (
    event: any,
    newValue?: string | boolean
  ) => {
    const dataCollectionId = event.target.getAttribute("data-set") as string;
    const fieldId = event.target["name"];

    onChangeDataCollection(dataCollectionId, fieldId, newValue);
  };

  const onCustomFieldValueChange = (field: string, value: string): void => {
    if (inputFormValuesCollection[field]) {
      inputFormValuesCollection[field].value = value;
      onChangeInputFieldValue(inputFormValuesCollection);
    }
  };

  const onExistingCustomFieldValueChange = (
    fieldId: string,
    newValue: string,
    dataCollectionId: string
  ): void => {
    onChangeDataCollection(dataCollectionId, fieldId, newValue);
  };

  // Headers
  const renderTableHeaders = (): JSX.Element[] => {
    return fields.map((field) => (
      <span className={`${styles.tableHead} ${styles.tableCell}`}>
        {field.title}
      </span>
    ));
  };

  //Inputs
  const renderFormInputFields = (): JSX.Element => {
    return (
      <>
        {fields.map((field) => {
          switch (field.type) {
            case "text":
              return (
                <span className={`${styles.tableCell} ${styles.inputField}`}>
                  <TextField
                    name={field.id}
                    id={ID()}
                    value={
                      inputFormValuesCollection[field.id] &&
                      (inputFormValuesCollection[field.id].value as string)
                    }
                    onChange={onInputFormValueChange}
                    required
                  />
                </span>
              );

            case "checkbox":
              return (
                <span className={`${styles.tableCell} ${styles.inputField}`}>
                  <Checkbox
                    name={field.id}
                    id={ID()}
                    checked={
                      inputFormValuesCollection[field.id].value
                        ? (inputFormValuesCollection[field.id].value as boolean)
                        : false
                    }
                    onChange={onInputFormValueChange}
                  />
                </span>
              );

            case "custom":
              return (
                <span className={`${styles.tableCell} ${styles.inputField}`}>
                  {field.onCustomRender(
                    field.id,
                    inputFormValuesCollection[field.id]
                      ? inputFormValuesCollection[field.id].value
                      : "#eeee",
                    onCustomFieldValueChange
                  )}
                </span>
              );
          }
        })}

        <span className={`${styles.tableCell} ${styles.inputField}`}></span>
        <span className={`${styles.tableCell} ${styles.inputField}`}>
          <IconButton
            disabled={false}
            iconProps={{ iconName: "Add" }}
            onClick={() => addToDataCollections(level)}
          />
        </span>
      </>
    );
  };

  // Data Collections
  const renderDataCollectionsValues = (): JSX.Element[] | JSX.Element => {
    if (dataCollections.length === 0) {
      return (
        <p className={styles.noCollectionData}>No data in your collection.</p>
      );
    }

    return dataCollections.map((dataCollection) => {
      return (
        <div className={`${styles.tableRow} ${styles.tableFooter}`}>
          {fields.map((field) => {
            switch (field.type) {
              case "text":
                return (
                  <span className={`${styles.tableCell} ${styles.inputField}`}>
                    <TextField
                      name={field.id}
                      data-set={dataCollection.uniqueId}
                      value={dataCollection.fields[field.id].value as string}
                      onChange={onDataCollectionValueChange}
                      required
                    />
                  </span>
                );

              case "checkbox":
                return (
                  <span className={`${styles.tableCell} ${styles.inputField}`}>
                    <Checkbox
                      name={field.id}
                      data-set={dataCollection.uniqueId}
                      checked={dataCollection.fields[field.id].value as boolean}
                      onChange={onDataCollectionValueChange}
                    />
                  </span>
                );

              case "custom":
                return (
                  <span className={`${styles.tableCell} ${styles.inputField}`}>
                    {field.onCustomRender(
                      field.id,
                      dataCollection.fields[field.id].value,
                      onExistingCustomFieldValueChange,
                      dataCollection.uniqueId
                    )}
                  </span>
                );
            }
          })}

          <span className={`${styles.tableCell} ${styles.inputField}`}>
            {level < 3 && (
              <IconButton
                iconProps={{ iconName: "WebAppBuilderFragmentCreate" }}
                onClick={() => {
                  navigateLevelDown(
                    dataCollection.uniqueId,
                    dataCollection.fields["title"].value as string
                  );
                }}
              />
            )}
          </span>

          <span className={`${styles.tableCell} ${styles.inputField}`}>
            <IconButton
              iconProps={{ iconName: "Cancel" }}
              onClick={() => removeDataCollection(dataCollection.uniqueId)}
            />
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
