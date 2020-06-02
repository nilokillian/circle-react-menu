import * as React from "react";
import { Icon, Callout, TooltipHost, Separator } from "office-ui-fabric-react";
import { Card } from "../card-component/Card";
import { DivisionContext } from "../../contexts/division-context/DivisionsContext";
import { IAnimatedMwnuItem } from "../../interfaces/IAnimatedMwnuItem";
import { getDirectionalHint } from "../../utils/getDirectionalHint";

import {
  tooltipStyles,
  menuItemsCalloutStyle,
} from "../../styles/fabricStyles";
import styles from "./MenuItemsStyle.module.scss";
import { IUser } from "../../contexts/division-context/interfaces/IDivisionContext";

export const MenuItems = ({ centreToCircle, items, open }) => {
  const divisionContext = React.useContext(DivisionContext);
  const [callOutVis, setCallOutVis] = React.useState(false);
  const [currentX, setCurrentX] = React.useState<number>();
  const [activeMenu, setActiveMenu] = React.useState<IAnimatedMwnuItem>(
    {} as IAnimatedMwnuItem
  );
  const btnRef = React.useRef();

  console.log("divisionContext", divisionContext);

  const getPersona = (): IUser[] | null => {
    const extraInfo = divisionContext.find(
      (item) => item.extraInfoId === activeMenu.extraInfoId
    );

    return extraInfo ? extraInfo.manager.users : null;
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
          styles={tooltipStyles}
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
          className={menuItemsCalloutStyle.callout}
          directionalHint={getDirectionalHint(currentX)}
          isBeakVisible={false}
          role="alertdialog"
          gapSpace={129}
          target={btnRef.current}
          onDismiss={() => setCallOutVis(false)}
          setInitialFocus={true}
        >
          <div className={menuItemsCalloutStyle.header}>
            <Separator>{activeMenu.title}</Separator>
          </div>

          <div className={menuItemsCalloutStyle.inner}>
            <Card item={activeMenu} persona={getPersona()} />
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
