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
    width: 350,
  },
  header: {
    padding: "20px 10px 10px 5px",

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
    height: 420,
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
