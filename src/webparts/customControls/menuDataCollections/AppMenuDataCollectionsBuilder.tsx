import * as React from "react";
import { MenuDataCollectionsBuilderPanel } from "./components/MenuDataCollectionsBuilderPanel";
import { MenuDataCollectionsContextProvider } from "./context/MenuDataCollectionsContext";
import { IAppMenuDataCollectionsBuilderProps } from "./interfaces/IAppMenuDataCollectionsBuilder";

export const AppMenuDataCollectionsBuilder: React.FC<IAppMenuDataCollectionsBuilderProps> = (
  props
) => {
  const { fields } = props;
  return (
    <MenuDataCollectionsContextProvider {...{ fields }}>
      <MenuDataCollectionsBuilderPanel {...props} />
    </MenuDataCollectionsContextProvider>
  );
};
