import * as React from "react";
import styles from "../styles/MenuDataCollection.module.scss";
import { TextField, Checkbox, IconButton } from "office-ui-fabric-react";
import { ITableRenderProps } from "../interfaces/ITableRenderProps";
import { ID } from "../utils/generateId";

export const TableRender: React.FC<ITableRenderProps> = ({
  dataCollections,
  fields,
  level,
  isValid,
  inputsCollection,
  onInputsCollectionChange,
  onAddToCollection,
  onRemoveDataCollection,
  onChangeDataCollection,
  toggleContainer,
}) => {
  const onFieldValueChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string | boolean
  ): void => {
    const fielId = event.target["name"];

    const updatedInputsCollection = { ...inputsCollection };

    updatedInputsCollection[fielId].value = newValue;
    onInputsCollectionChange(updatedInputsCollection);
  };

  const onExistingFieldValueChange = (
    event: any,
    newValue?: string | boolean
  ) => {
    const dataCollectionId = event.target.getAttribute("data-set");
    const fieldId = event.target["name"];
    const id = event.target["id"];

    onChangeDataCollection(dataCollectionId, fieldId, newValue);
  };

  const onCustomFieldValueChange = (field: string, value: string): void => {
    if (inputsCollection[field]) {
      inputsCollection[field].value = value;
      onInputsCollectionChange(inputsCollection);
    }
  };

  const onExistingCustomFieldValueChange = (
    fieldId: string,
    newValue: string,
    dataCollectionId: string
  ): void => {
    onChangeDataCollection(dataCollectionId, fieldId, newValue);
  };

  const renderTableHeaders = (): JSX.Element[] => {
    return fields.map((field) => (
      <span className={`${styles.tableHead} ${styles.tableCell}`}>
        {field.title}
      </span>
    ));
  };

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
                      inputsCollection[field.id] &&
                      (inputsCollection[field.id].value as string)
                    }
                    onChange={onFieldValueChange}
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
                      inputsCollection[field.id].value
                        ? (inputsCollection[field.id].value as boolean)
                        : false
                    }
                    onChange={onFieldValueChange}
                  />
                </span>
              );

            case "custom":
              return (
                <span className={`${styles.tableCell} ${styles.inputField}`}>
                  {field.onCustomRender(
                    field.id,
                    inputsCollection[field.id]
                      ? inputsCollection[field.id].value
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
            onClick={() => onAddToCollection(inputsCollection, level)}
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
                      onChange={onExistingFieldValueChange}
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
                      onChange={onExistingFieldValueChange}
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
                onClick={() =>
                  toggleContainer(
                    dataCollection.uniqueId,
                    dataCollection.fields["title"].value as string
                  )
                }
              />
            )}
          </span>

          <span className={`${styles.tableCell} ${styles.inputField}`}>
            <IconButton
              iconProps={{ iconName: "Cancel" }}
              onClick={() => onRemoveDataCollection(dataCollection.uniqueId)}
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
