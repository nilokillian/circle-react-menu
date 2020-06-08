import * as React from "react";
import { Stack } from "office-ui-fabric-react";
import { CardContextualMenu } from "../card-contextual-menu-component/CardContextualMenu";
import { PersonaComponent } from "../persona-component/PersonaComponent";
import { CardPivot } from "../card-pivot/CardPivot";
import { ICardProps } from "./ICardProps";

export const Card: React.FC<ICardProps> = React.memo(({ item, persona }) => {
  const mergePersonaProps = () => {
    return persona
      ? persona.map((p) => ({ ...p, imageUrl: item.imageUrl }))
      : [];
  };

  return (
    <>
      <Stack>
        <Stack horizontal horizontalAlign="start" wrap>
          <PersonaComponent persona={mergePersonaProps()} />
        </Stack>
      </Stack>

      <Stack>
        <Stack horizontal horizontalAlign="center" wrap>
          <CardContextualMenu {...item} />
        </Stack>
      </Stack>

      <CardPivot divisionId={item.extraInfoId} />
    </>
  );
});
