import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import { CircleMenu } from "./components/CircleMenu";
import { ICircleMenuProps } from "./components/ICircleMenuProps";
import { ICircleMenuWebPartProps } from "./interfaces/ICircleMenuWebPartProps";
import { initializeIcons } from "@uifabric/icons";
import {
  PropertyFieldCollectionData,
  CustomCollectionFieldType
} from "@pnp/spfx-property-controls/lib/PropertyFieldCollectionData";
import { getColourPickerJSXElement } from "./utils/getJSX";
import {
  PropertyMenuDataCollections,
  CustomMenuDataCollectionFieldType
} from "../customControls/menuDataCollections/propertyMenuDataCollections";

export default class CircleMenuWebPart extends BaseClientSideWebPart<
  ICircleMenuWebPartProps
> {
  public render(): void {
    const element: React.ReactElement<ICircleMenuProps> = React.createElement(
      CircleMenu,
      {
        color: this.properties.color,
        menuItems: this.properties.firstLvlMenuItems
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

    if (propertyPath === "firstLvlMenuItems" && newValue) {
      this.properties.secondLvlMenuItems = [{ title: "Test" }];
      console.log("newValue", newValue);
      this.context.propertyPane.refresh();
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
                // PropertyFieldCollectionData("firstLvlMenuItems", {
                //   key: "firstLvlMenuItems",
                //   label: "",
                //   panelHeader: "Create top level menu items",
                //   manageBtnLabel: "1st level menu",
                //   panelDescription:
                //     "Look up for icons  : https://developer.microsoft.com/en-us/fabric#/styles/web/icons",
                //   value: this.properties.firstLvlMenuItems,
                //   fields: [
                //     {
                //       id: "title",
                //       title: "Title",
                //       type: CustomCollectionFieldType.string,
                //       required: true
                //     },
                //     {
                //       id: "icon",
                //       title: "Icon",
                //       type: CustomCollectionFieldType.string
                //     },
                //     {
                //       id: "hasSubMenu",
                //       title: "Has sub-menu ?",
                //       type: CustomCollectionFieldType.boolean
                //     },
                //     {
                //       id: "color",
                //       title: "Color",
                //       type: CustomCollectionFieldType.custom,
                //       onCustomRender: (
                //         field,
                //         value,
                //         onUpdate,
                //         item,
                //         itemId
                //       ) => {
                //         return React.createElement(
                //           "div",
                //           null,

                //           getColourPickerJSXElement(value, field, onUpdate)
                //         );
                //       }
                //     }
                //   ],
                //   disabled: false
                // }),

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
                      id: "colour",
                      title: "Colour",
                      type: CustomMenuDataCollectionFieldType.custom,
                      onCustomRender: (field, value, onUpdate) => {
                        return React.createElement(
                          "div",
                          null,
                          getColourPickerJSXElement(field, value, onUpdate)
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
