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
  mergeStyleSets,
  getId
} from "office-ui-fabric-react";

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
  const btnRef = React.useRef();

  const buttons = items.map(item => {
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
          directionalHint={DirectionalHint.leftCenter}
          isBeakVisible={false}
          ariaLabelledBy={"444"}
          ariaDescribedBy={"rrr"}
          role="alertdialog"
          gapSpace={0}
          target={btnRef.current}
          onDismiss={() => setCallOutVis(false)}
          setInitialFocus={true}
        >
          <div className={fabricStyles.header}>
            <p className={fabricStyles.title} id={"klk"}>
              All of your favorite people
            </p>
          </div>
          <div className={fabricStyles.inner}>
            <p className={fabricStyles.subtext} id={"uyu"}>
              Message body is optional. If help documentation is available,
              consider adding a link to learn more at the bottom.
            </p>
            <div className={fabricStyles.actions}>
              <Link
                className={fabricStyles.link}
                href="http://microsoft.com"
                target="_blank"
              >
                Go to microsoft
              </Link>
            </div>
          </div>
        </Callout>
      )}
    </div>
  );
};
