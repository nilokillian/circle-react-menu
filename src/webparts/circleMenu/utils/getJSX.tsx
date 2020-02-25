import * as React from "react";
import {
  IconButton,
  ColorPicker,
  Callout,
  DirectionalHint,
  Checkbox
} from "office-ui-fabric-react";
import {
  IMenuColourPickerProps,
  IMenuColourPickerState
} from "../interfaces/IGetJSX";

export interface IHasSubMenuCheckBoxState {
  hasSubMenu: boolean;
}

class HasSubMenuCheckBox extends React.Component<
  IMenuColourPickerProps,
  IHasSubMenuCheckBoxState
> {
  constructor(props: IMenuColourPickerProps) {
    super(props);
    this.state = {
      hasSubMenu: false
    };
  }

  private onCheckChange = (
    ev: React.FormEvent<HTMLElement>,
    checked: boolean
  ) => {
    this.props.onUpdate(this.props.field.id, checked);
  };

  public render() {
    const { hasSubMenu } = this.state;
    return (
      <Checkbox
        label="Controlled checkbox"
        checked={true}
        onChange={this.onCheckChange}
      />
    );
  }
}

class MenuColourPicker extends React.Component<
  IMenuColourPickerProps,
  IMenuColourPickerState
> {
  constructor(props: IMenuColourPickerProps) {
    super(props);
    this.state = {
      isColourPicker: false
    };
  }
  private contextualMneuDialogRef: React.RefObject<
    HTMLDivElement
  > = React.createRef();

  private onColourChange = (
    ev: React.SyntheticEvent<HTMLElement>,
    colorObj
  ) => {
    this.props.onUpdate(this.props.field.id, colorObj.str);
  };

  public render() {
    const { isColourPicker } = this.state;
    return (
      <>
        <IconButton
          iconProps={{ iconName: "Precipitation" }}
          onClick={() => this.setState({ isColourPicker: true })}
        />
        <div className="calloutArea" ref={this.contextualMneuDialogRef}>
          {isColourPicker && (
            <Callout
              gapSpace={0}
              target={this.contextualMneuDialogRef.current}
              onDismiss={() => this.setState({ isColourPicker: false })}
              setInitialFocus={true}
              isBeakVisible={false}
              directionalHint={DirectionalHint.bottomCenter}
            >
              <ColorPicker
                color={this.props.color}
                onChange={this.onColourChange}
                alphaSliderHidden={false}
                // showPreview={true}
                // styles={colorPickerStyles}
              />
            </Callout>
          )}
        </div>
      </>
    );
  }
}

export const getColourPickerJSXElement = (
  value: any,
  field: any,
  onUpdate: (fieldId: string, value: any) => void
) => {
  return <MenuColourPicker onUpdate={onUpdate} color={value} field={field} />;
};

export const getSubMenuCheckBoxJSXElement = (
  value: any,
  field: any,
  onUpdate: (fieldId: string, value: any) => void
) => {
  return <MenuColourPicker onUpdate={onUpdate} color={value} field={field} />;
};
