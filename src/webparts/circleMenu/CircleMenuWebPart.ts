import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { CircleMenu } from "./components/CircleMenu";
import { ICircleMenuProps } from "./interfaces/ICircleMenuProps";
import { ICircleMenuWebPartProps } from "./interfaces/ICircleMenuWebPartProps";
import { initializeIcons } from "@uifabric/icons";
import { getColourPickerJSXElement } from "./utils/getJSX";
import { PropertyMenuDataCollections } from "../customControls/menuDataCollections/propertyMenuDataCollections";
import { CustomMenuDataCollectionFieldType } from "../customControls/menuDataCollections/constants/customMenuDataCollectionFieldType";

export default class CircleMenuWebPart extends BaseClientSideWebPart<
  ICircleMenuWebPartProps
> {
  public render(): void {
    const element: React.ReactElement<ICircleMenuProps> = React.createElement(
      CircleMenu,
      {
        menuItems: this.properties.dataCollections
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  public async onInit(): Promise<void> {
    await super.onInit();
    initializeIcons();
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected onPropertyPaneFieldChanged(
    propertyPath: string,
    oldValue: any,
    newValue: any
  ): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);

    if (propertyPath === "dataCollections" && newValue) {
      this.properties.dataCollections = newValue;
      console.log(
        "this.properties.dataCollections",
        this.properties.dataCollections
      );
      this.context.propertyPane.refresh();
      this.render();
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: "Menu builder settings",
              groupFields: [
                new PropertyMenuDataCollections("dataCollections", {
                  key: "dataCollections",
                  panelHeaderTitle: "Menu Builder",
                  calloutButtonTitle: "Menu Builder",
                  value: this.properties.dataCollections,
                  onProppertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  fields: [
                    {
                      id: "title",
                      title: "Title",
                      type: CustomMenuDataCollectionFieldType.string
                    },
                    {
                      id: "icon",
                      title: "Icon",
                      type: CustomMenuDataCollectionFieldType.string
                    },
                    {
                      id: "url",
                      title: "Link",
                      type: CustomMenuDataCollectionFieldType.string
                    },
                    {
                      id: "colour",
                      title: "Colour",
                      type: CustomMenuDataCollectionFieldType.custom,
                      setDefaultValue: () => "#red",
                      onCustomRender: (field, value, onCustomFieldUpdate) => {
                        return React.createElement(
                          "div",
                          null,
                          getColourPickerJSXElement(
                            field,
                            value,
                            onCustomFieldUpdate
                          )
                        );
                      }
                    }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
