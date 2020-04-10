import * as React from "react";
import {
  IconButton,
  ColorPicker,
  Callout,
  DirectionalHint,
  IColor,
} from "office-ui-fabric-react";
import {
  IColourPickerComponentProps,
  IColourPickerComponentState,
} from "../interfaces/IColourPickerComponent";

class ColourPickerComponent extends React.Component<
  IColourPickerComponentProps,
  IColourPickerComponentState
> {
  constructor(props: IColourPickerComponentProps) {
    super(props);
    this.state = {
      isColourPicker: false,
    };
  }
  private contextualMneuDialogRef: React.RefObject<
    HTMLDivElement
  > = React.createRef();

  private onColourChange = (
    _ev: React.SyntheticEvent<HTMLElement>,
    colorObj: IColor
  ): void => {
    //console.log("colorObj.str", colorObj);
    this.props.onUpdate(
      this.props.field,
      colorObj.str,
      this.props.dataCollectionId
    );
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
                color={this.props.color ? this.props.color : "#fff"}
                onChange={this.onColourChange}
                alphaSliderHidden={false}
              />
            </Callout>
          )}
        </div>
      </>
    );
  }
}

export const getColourPickerJSXElement = (
  field: string,
  value: any,
  onUpdate: (fieldId: string, value: any, dataCollectionId?: string) => any,
  dataCollectionId?: string
) => {
  return (
    <ColourPickerComponent
      onUpdate={onUpdate}
      color={value}
      field={field}
      dataCollectionId={dataCollectionId}
    />
  );
};
