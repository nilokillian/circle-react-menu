import * as React from "react";
import styles from "../styles/MenuDataCollection.module.scss";
import { TextField, Checkbox, IconButton } from "office-ui-fabric-react";
import { ITableRenderProps } from "../interfaces/ITableRenderProps";

export const TableRender: React.FC<ITableRenderProps> = ({
  dataCollections,
  fields,
  level,
  currentDataCollection,
  onCurrentDataCollectionChange,
  onAddToCollection,
  onRemoveDataCollection,
  onChangeDataCollection,
  toggleContainer
}) => {
  const onFieldValueChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string | boolean
  ): void => {
    const fielId = event.target["name"];

    currentDataCollection[fielId].value = newValue;
    onCurrentDataCollectionChange({ ...currentDataCollection });
  };

  const onExistingFieldValueChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string | boolean
  ) => {
    const dataCollectionId = event.target["id"];
    const fieldTitle = event.target["name"];
    console.log("dataCollectionId", dataCollectionId, "fieldTitle", fieldTitle);

    onChangeDataCollection(dataCollectionId, fieldTitle, newValue);
  };

  const onCustomFieldChange = (field: string, colorObj: string): any => {
    console.log("colorObj", colorObj, "field", field);
    // const fielId = event.target["name"];
    currentDataCollection[field].value = colorObj;
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
                    checked={
                      currentDataCollection[field.id]
                        ? (currentDataCollection[field.id].value as boolean)
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
                    currentDataCollection[field.id]
                      ? (currentDataCollection[field.id].value as string)
                      : "#8ed4ba",
                    onCustomFieldChange
                  )}
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

    return dataCollections.map(dataCollection => {
      return (
        <div className={`${styles.tableRow} ${styles.tableFooter}`}>
          {fields.map(field => {
            switch (field.type) {
              case "text":
                return (
                  <span className={`${styles.tableCell} ${styles.inputField}`}>
                    <TextField
                      name={field.id}
                      value={dataCollection.fields[field.id].value as string}
                      id={dataCollection.uniqueId}
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
                      id={dataCollection.uniqueId}
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
                      "value",
                      onCustomFieldChange
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
