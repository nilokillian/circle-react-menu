import * as React from "react";
import styles from "../styles/CircleMenu.module.scss";
import {
  Icon,
  Callout,
  TooltipHost,
  getTheme,
  FontWeights,
  mergeStyleSets,
  ITooltipHostStyles,
} from "office-ui-fabric-react";
import { Card } from "./Card";
import { IAnimatedMwnuItem } from "../interfaces/IAnimatedMwnuItem";

const theme = getTheme();
const hostStyles: Partial<ITooltipHostStyles> = {
  root: { display: "flex", margin: "auto" },
};

const fabricStyles = mergeStyleSets({
  buttonArea: {
    verticalAlign: "top",
    display: "inline-block",
    textAlign: "center",
    margin: "0 100px",
    minWidth: 130,
    height: 32,
  },
  callout: {
    maxWidth: 300,
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
    padding: "0 24px 20px",
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

export const MenuItems = ({ centreToCircle, items, open }) => {
  const [callOutVis, setCallOutVis] = React.useState(false);
  const [currentX, setCurrentX] = React.useState<number>();
  const [activeMenu, setActiveMenu] = React.useState<IAnimatedMwnuItem>(
    {} as IAnimatedMwnuItem
  );
  const btnRef = React.useRef();

  const getDirectionalHint = ():
    | 0
    | 1
    | 2
    | 12
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 13 => {
    //rightCenter : 12
    //leftCenter ; 9

    return currentX >= 780 ? 12 : 9;
  };

  const buttons = items.map((item: any) => {
    const styling = {
      transform: `rotate(${item.rotation}deg) 
           translate(${centreToCircle / 1.7}em) 
           rotate(${-item.rotation}deg)`,
      backgroundColor: item.color,
    };

    return (
      <div
        className={`${styles.menuItem} ${styles.itemShow}`}
        style={styling}
        onClick={(e) => {
          setCurrentX(e.screenX);
          setActiveMenu(item);
          setCallOutVis(true);
        }}
      >
        <TooltipHost
          styles={hostStyles}
          content={item.title}
          id={item.title}
          calloutProps={{ gapSpace: 10 }}
        >
          <Icon
            iconName={item.icon}
            className="ms-IconExample"
            aria-describedby={item.title}
          />
        </TooltipHost>
      </div>
    );
  });

  return (
    <div
      ref={btnRef}
      className={
        open ? `${styles.buttonBg} ${styles.animateMenu}` : `${styles.buttonBg}`
      }
    >
      {buttons}
      {callOutVis && (
        <Callout
          className={fabricStyles.callout}
          directionalHint={getDirectionalHint()}
          isBeakVisible={false}
          role="alertdialog"
          gapSpace={129}
          target={btnRef.current}
          onDismiss={() => setCallOutVis(false)}
          setInitialFocus={true}
        >
          <div className={fabricStyles.header}>{activeMenu.title}</div>
          <div className={fabricStyles.inner}>
            <Card {...activeMenu} />
          </div>
        </Callout>
      )}
    </div>
  );
};

// className={
//   item.show
//     ? `${styles.menuItem} ${styles.itemShow}`
//     : `${styles.menuItem} ${styles.itemHide}`
// }
