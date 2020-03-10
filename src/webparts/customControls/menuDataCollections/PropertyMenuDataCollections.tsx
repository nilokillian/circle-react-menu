import * as React from "react";
import * as ReactDom from "react-dom";
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
  IPropertyPaneCustomFieldProps
} from "@microsoft/sp-property-pane";
import { MenuDataCollectionsBuilderPanel } from "./components/MenuDataCollectionsBuilderPanel";
import { IMenuDataCollectionsBuilderPanelProps } from "./interfaces/IMenuDataCollectionsBuilderPanelProps";
import { IPropertyMenuDataCollectionsProps } from "./interfaces/IPropertyMenuDataCollectionsProps";

export interface IPropertyMenuDataCollectionsInternalProps
  extends IPropertyMenuDataCollectionsProps,
    IPropertyPaneCustomFieldProps {}

export class PropertyMenuDataCollections
  implements IPropertyPaneField<IPropertyMenuDataCollectionsProps> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyMenuDataCollectionsInternalProps;
  private elem: HTMLElement;

  constructor(
    targetProperty: string,
    properties: IPropertyMenuDataCollectionsProps
  ) {
    this.targetProperty = targetProperty;
    this.properties = {
      key: properties.key,
      panelHeaderTitle: properties.panelHeaderTitle,
      calloutButtonTitle: properties.calloutButtonTitle,
      value: properties.value,
      fields: properties.fields,
      onProppertyChange: properties.onProppertyChange,
      onRender: this.onRender.bind(this)
    };
  }

  public render(): void {
    if (!this.elem) return;

    this.onRender(this.elem);
  }

  private onRender(elem: HTMLElement): void {
    if (!this.elem) this.elem = elem;

    const element: React.ReactElement<IMenuDataCollectionsBuilderPanelProps> = React.createElement(
      MenuDataCollectionsBuilderPanel,
      {
        key: this.properties.key,
        label: this.properties.panelHeaderTitle,
        btnLabel: this.properties.calloutButtonTitle,
        value: this.properties.value,
        fields: this.properties.fields,
        onChanged: this.onChanged.bind(this)
      }
    );

    ReactDom.render(element, elem);
  }

  private onChanged(dataCollections: any[]): void {
    this.properties.onProppertyChange(
      this.targetProperty,
      this.properties.value,
      dataCollections
    );
  }
}
