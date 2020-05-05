import * as React from "react";
import { MemoizedMenu } from "./Menu";
import { InnerCircle } from "./InnerCircle";
import { MenuToggle } from "./MenuToggle";
import { WebPartPropsContext } from "../contexts/WebPartPropsContext";

export interface IMenuWrapperProps {
  menuItems: any[];
}

export interface IMenuWrapperState {
  menuOpen: boolean;
  menuItems: any[];
}

export const MenuWrapper = (): JSX.Element => {
  const { menuItems, centreToCircle } = React.useContext(WebPartPropsContext);
  // const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const makeMenu = (menuConfig: any[]): any[] => {
    const angle = 360 / menuConfig.length;
    let rotation = 0;
    const makeMenuItems = [];

    menuConfig.forEach(({ color, icon, title, imageUrl, subMenu }) => {
      makeMenuItems.push({
        color,
        icon,
        title,
        imageUrl,
        subMenu,
        rotation,
        angle,
        show: false,
      });
      rotation += angle;
    });

    return makeMenuItems;
  };
  const [animatedMenuItems, setAnimatedMenuItems] = React.useState<any[]>(() =>
    makeMenu(menuItems)
  );

  // staggerd fade menu items in
  const animateButtons = (items: any[]): void => {
    const length = items.length;

    const stagger = (i: number) => {
      if (i < length) {
        setTimeout(() => {
          // let items = makeMenu(menuItems);
          // let items = currentMenuItems;
          //   let showing = currentMenuItems[i].show;

          items[i].show = true;

          setAnimatedMenuItems([...items]);
          stagger(i + 1);
        }, 70);
      }
    };

    stagger(0);
  };

  React.useEffect(() => {
    animateButtons(makeMenu(menuItems));
    console.log("menu items changed", menuItems);
  }, [menuItems]);

  return (
    <div>
      <InnerCircle />
      <MemoizedMenu centreToCircle={centreToCircle} items={animatedMenuItems} />
    </div>
  );
};

{
  /* <MenuToggle
        toggle={() => setIsMenuOpen(prevState => !prevState)}
        open={isMenuOpen}
        animateButtons={animateButtons}
      /> */
}
