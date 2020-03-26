import * as React from "react";
import styles from "../styles/CircleMenu.module.scss";
import {
  Icon,
  DefaultButton,
  DirectionalHint,
  Callout,
  Link,
  getTheme,
  FontWeights,
  mergeStyleSets
} from "office-ui-fabric-react";
import { Card } from "./Card";

const theme = getTheme();

const fabricStyles = mergeStyleSets({
  buttonArea: {
    verticalAlign: "top",
    display: "inline-block",
    textAlign: "center",
    margin: "0 100px",
    minWidth: 130,
    height: 32
  },
  callout: {
    maxWidth: 300
  },
  header: {
    padding: "18px 24px 12px"
  },
  title: [
    theme.fonts.xLarge,
    {
      margin: 0,
      fontWeight: FontWeights.semilight
    }
  ],
  inner: {
    height: "100%",
    padding: "0 24px 20px"
  },
  actions: {
    position: "relative",
    marginTop: 20,
    width: "100%",
    whiteSpace: "nowrap"
  },
  subtext: [
    theme.fonts.small,
    {
      margin: 0,
      fontWeight: FontWeights.semilight
    }
  ],
  link: [
    theme.fonts.medium,
    {
      color: theme.palette.neutralPrimary
    }
  ]
});

export const MenuItems = ({ size, items, open }) => {
  const [callOutVis, setCallOutVis] = React.useState(false);
  const [currentX, setCurrentX] = React.useState<number>();
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

    return currentX >= 888 ? 12 : 9;
  };

  const buttons = items.map((item: any) => {
    const styling = {
      transform: `rotate(${item.rotation}deg) 
           translate(${size / 1.6}em) 
           rotate(${-item.rotation}deg)`,
      backgroundColor: item.color
    };

    return (
      <div
        className={
          item.show
            ? `${styles.menuItem} ${styles.itemShow}`
            : `${styles.menuItem} ${styles.itemHide}`
        }
        style={styling}
        onClick={e => {
          setCurrentX(e.clientX);
          item.click(e);
          setCallOutVis(true);
        }}
      >
        <Icon iconName="CompassNW" className="ms-IconExample" />

        {/* <i className={"fa " + item.icon} aria-hidden="true"></i> */}
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
          <div className={fabricStyles.header}></div>
          <div className={fabricStyles.inner}>
            <Card />
          </div>
        </Callout>
      )}
    </div>
  );
};
