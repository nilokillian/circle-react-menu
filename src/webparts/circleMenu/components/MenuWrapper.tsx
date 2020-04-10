import * as React from "react";
import { MemoizedMenu } from "./Menu";
import { InnerCircle } from "./InnerCircle";
import { MenuToggle } from "./MenuToggle";
import { WebPartPropsContext } from "../contexts/WebPartPropsContext";

// const itemClick = (e) => {
//   console.log("e", e);

//   console.log("clientLeft", e.target.clientLeft);
//   console.log("offsetWidth", e.target.offsetWidth);

//   console.log("x", e.clientX, "y", e.clientY);

// };

export interface IMenuWrapperProps {
  menuItems: any[];
}

// const menuData = [
//   {
//     color: "#b3462f",
//     icon: "fa-paper-plane",
//     click: itemClick
//   },
//   {
//     color: "#e78b38",
//     icon: "fa-pencil",
//     click: itemClick
//   },
//   {
//     color: "#353535",
//     icon: "fa-trash",
//     click: itemClick
//   },
//   {
//     color: "#303c54",
//     icon: "fa-tags",
//     click: itemClick
//   },
//   {
//     color: "#3a384e",
//     icon: "fa-search",
//     click: itemClick
//   },
//   {
//     color: "#78332c",
//     icon: "fa-users",
//     click: itemClick
//   },
//   {
//     color: "#78332c",
//     icon: "fa-users",
//     click: itemClick
//   },
//   {
//     color: "#353535",
//     icon: "fa-trash",
//     click: itemClick
//   },
//   {
//     color: "#353535",
//     icon: "fa-trash",
//     click: itemClick
//   }
//   // {
//   //   color: "#353535",
//   //   icon: "fa-trash",
//   //   click: itemClick
//   // }
// ];

export interface IMenuWrapperState {
  menuOpen: boolean;
  menuItems: any[];
}

export const MenuWrapper = (): JSX.Element => {
  const { menuItems } = React.useContext(WebPartPropsContext);
  // const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const makeMenu = (menuConfig: any[]): any[] => {
    const angle = 360 / menuConfig.length;
    let rotation = 0;
    const makeMenuItems = [];

    menuConfig.forEach(({ color, icon, title, click }) => {
      makeMenuItems.push({
        color,
        icon,
        click,
        title,
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
      <MemoizedMenu size={17} items={animatedMenuItems} />
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
