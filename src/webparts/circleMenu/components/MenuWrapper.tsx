import * as React from "react";
import { Menu } from "./Menu";
import { InnerCircle } from "./InnerCircle";
import { MenuToggle } from "./MenuToggle";
import { WebPartPropsContext } from "../contexts/WebPartProps";

const itemClick = e => {
  console.log("e", e);

  console.log("clientLeft", e.target.clientLeft);
  console.log("offsetWidth", e.target.offsetWidth);

  console.log("x", e.clientX, "y", e.clientY);

  screenX: null;
  screenY: null;
};

export interface IMenuWrapperProps {
  menuItems: any[];
}

const menuData = [
  {
    color: "#b3462f",
    icon: "fa-paper-plane",
    click: itemClick
  },
  {
    color: "#e78b38",
    icon: "fa-pencil",
    click: itemClick
  },
  {
    color: "#353535",
    icon: "fa-trash",
    click: itemClick
  },
  {
    color: "#303c54",
    icon: "fa-tags",
    click: itemClick
  },
  {
    color: "#3a384e",
    icon: "fa-search",
    click: itemClick
  },
  {
    color: "#78332c",
    icon: "fa-users",
    click: itemClick
  },
  {
    color: "#78332c",
    icon: "fa-users",
    click: itemClick
  },
  {
    color: "#353535",
    icon: "fa-trash",
    click: itemClick
  },
  {
    color: "#353535",
    icon: "fa-trash",
    click: itemClick
  }
  // {
  //   color: "#353535",
  //   icon: "fa-trash",
  //   click: itemClick
  // }
];

export interface IMenuWrapperState {
  menuOpen: boolean;
  menuItems: any[];
}

export const MenuWrapper = (): JSX.Element => {
  const { menuItems } = React.useContext(WebPartPropsContext);
  // const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const makeMenu = (menuConfig: any[]) => {
    const angle = 360 / menuConfig.length;
    let rotation = 0;
    let makeMenuItems = [];

    menuConfig.forEach(({ color, icon, click }) => {
      makeMenuItems.push({
        color,
        icon,
        click,
        rotation,
        angle,
        show: false
      });
      rotation += angle;
    });

    return makeMenuItems;
  };
  const [currentMenuItems, setCurrentMenuItems] = React.useState<any[]>(() =>
    makeMenu(menuData)
  );

  // private getInitialState () {
  //   return {
  //     menuOpen: false,
  //   };
  // }

  //   componentWillMount() {
  //     this.makeMenu(menuData);
  //   }

  // calculate angles and distance between menu items
  // then set position on menu-item objects

  //setCurrentMenuItems(makeMenuItems);
  // this.setState({
  //   menuItems: menuItems
  // });

  //   const toggleMenu = () => {
  //     this.setState({
  //       menuOpen: !this.state.menuOpen
  //     });
  //   };

  // staggerd fade menu items in
  const animateButtons = () => {
    const length = currentMenuItems.length;

    const stagger = (i: number) => {
      if (i < length) {
        setTimeout(() => {
          let items = currentMenuItems;
          let showing = currentMenuItems[i].show;

          items[i].show = !showing;

          setCurrentMenuItems([...items]);

          //   this.setState({
          //     menuItems: [
          //       ...items.slice(0, i),
          //       Object.assign({}, items[i], {
          //         show: !showing
          //       }),
          //       ...items.slice(i + 1)
          //     ]
          //   });

          stagger(i + 1);
        }, 70);
      }
    };

    stagger(0);
  };

  React.useEffect(() => {
    animateButtons();
  }, []);

  return (
    <div>
      <InnerCircle />
      {/* <MenuToggle
        toggle={() => setIsMenuOpen(prevState => !prevState)}
        open={isMenuOpen}
        animateButtons={animateButtons}
      /> */}
      <Menu size={18} items={currentMenuItems} open={true} />
    </div>
  );
};
