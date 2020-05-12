import * as React from "react";
import { MenuDataCollectionsBuilderPanel } from "./components/MenuDataCollectionsBuilderPanel";
import { MenuDataCollectionsContextProvider } from "./context/MenuDataCollectionsContext";
import { IAppMenuDataCollectionsBuilderProps } from "./interfaces/IAppMenuDataCollectionsBuilder";
import { MenuItemsBuilder } from "./components/MenuItemsBuilder";

export const AppMenuDataCollectionsBuilder: React.FC<IAppMenuDataCollectionsBuilderProps> = (
  props
) => {
  return (
    <div>
      <MenuDataCollectionsContextProvider {...props}>
        <MenuDataCollectionsBuilderPanel {...props} />
      </MenuDataCollectionsContextProvider>
    </div>
  );
};
