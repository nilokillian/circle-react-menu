import {
  IButtonStyles,
  IStylesFunctionOrObject,
  IComponentStyles,
  IStackSlots,
  IStackProps,
  IStackTokens,
  mergeStyleSets,
  getTheme,
  ITooltipHostStyles,
  FontWeights,
} from "office-ui-fabric-react";

const theme = getTheme();

export const cardContextualManuStackStyle = (): IStylesFunctionOrObject<
  IStackProps,
  IStackTokens,
  IComponentStyles<IStackSlots>
> => ({ root: { marginTop: 10 } });

export const cardContextualMenuBtnStyle: IButtonStyles = {
  menuIcon: { display: "none" },
  root: { width: 140, fontSize: 12 },
};

export const tooltipStyles: Partial<ITooltipHostStyles> = {
  root: { display: "flex", margin: "auto" },
};

export const menuItemsCalloutStyle = mergeStyleSets({
  buttonArea: {
    verticalAlign: "top",
    display: "inline-block",
    textAlign: "center",
    margin: "0 100px",
    minWidth: 130,
    height: 32,
  },
  callout: {
    maxWidth: 600,
  },
  header: {
    padding: "10px 5px 5px",
    textAlign: "center",
    fontSize: 15,
    fontWeight: 300,
  },
  title: [
    theme.fonts.xLarge,
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
    },
  ],
  inner: {
    height: "100%",
    padding: "0 14px 10px",
  },
  actions: {
    position: "relative",
    marginTop: 20,
    width: "100%",
    whiteSpace: "nowrap",
  },
  subtext: [
    theme.fonts.small,
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
    },
  ],
  link: [
    theme.fonts.medium,
    {
      color: theme.palette.neutralPrimary,
    },
  ],
});
