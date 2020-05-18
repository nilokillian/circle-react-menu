import * as React from "react";
import { ImageFit, Image } from "office-ui-fabric-react";
import { CardContextualMenu } from "./CardContextualMenu";
import { IAnimatedMwnuItem } from "../interfaces/IAnimatedMwnuItem";

export const Card: React.FC<IAnimatedMwnuItem> = React.memo((props) => {
  return (
    <div style={{ width: 200 }}>
      <Image
        height={250}
        src={props.imageUrl}
        imageFit={ImageFit.centerContain}
      />
      <CardContextualMenu {...props} />
    </div>
  );
});
