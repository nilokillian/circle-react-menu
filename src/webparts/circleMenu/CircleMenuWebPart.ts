import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import {
  BaseClientSideWebPart,
  PropertyPaneSlider,
  PropertyPaneHorizontalRule,
} from "@microsoft/sp-webpart-base";
import { CircleMenuApp } from "./components/circle-menu-app-component/CircleMenuApp";
import { ICircleMenuAppProps } from "./interfaces/ICircleMenuAppProps";
import { ICircleMenuWebPartProps } from "./interfaces/ICircleMenuWebPartProps";
import { initializeIcons } from "@uifabric/icons";
import { getColourPickerJSXElement } from "./customFieldControls/ColourPickerComponent";
import { PropertyMenuDataCollections } from "../customControls/menuDataCollections/propertyMenuDataCollections";
import { CustomMenuDataCollectionFieldType } from "../customControls/menuDataCollections/constants/customMenuDataCollectionFieldType";
import SharePointService from "./services/SharePointService";

export default class CircleMenuWebPart extends BaseClientSideWebPart<
  ICircleMenuWebPartProps
> {
  public render(): void {
    const element: React.ReactElement<ICircleMenuAppProps> = React.createElement(
      CircleMenuApp,
      {
        menuItemsCollections: this.properties.dataCollections,
        centreToCircle: this.properties.centreToCircle,
        context: this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  public async onInit(): Promise<void> {
    await super.onInit();
    SharePointService.setup(this.context);
    SharePointService.pnp_setup(this.context);
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

    if (
      propertyPath === "dataCollections" &&
      newValue &&
      newValue !== oldValue
    ) {
      this.properties.dataCollections = newValue;

      console.log(
        "this.properties.dataCollections",
        this.properties.dataCollections
      );
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
                      type: CustomMenuDataCollectionFieldType.string,
                    },
                    {
                      id: "icon",
                      title: "Icon",
                      type: CustomMenuDataCollectionFieldType.string,
                    },
                    {
                      id: "imageUrl",
                      title: "Image Link",
                      type: CustomMenuDataCollectionFieldType.string,
                    },
                    {
                      id: "url",
                      title: "Link",
                      type: CustomMenuDataCollectionFieldType.string,
                    },
                    {
                      id: "extraInfoId",
                      title: "Extra Info ID",
                      type: CustomMenuDataCollectionFieldType.string,
                    },
                    {
                      id: "colour",
                      title: "Colour",
                      type: CustomMenuDataCollectionFieldType.custom,
                      setDefaultValue: () => "#eee",
                      onCustomRender: (
                        field,
                        value,
                        onCustomFieldUpdate,
                        dataCollectionId
                      ) => {
                        return React.createElement(
                          "div",
                          null,
                          getColourPickerJSXElement(
                            field,
                            value,
                            onCustomFieldUpdate,
                            dataCollectionId
                          )
                        );
                      },
                    },
                  ],
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneSlider("centreToCircle", {
                  label: "Distance from center",
                  min: 10,
                  max: 19,
                  value: this.properties.centreToCircle,
                  showValue: true,
                  step: 1,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
