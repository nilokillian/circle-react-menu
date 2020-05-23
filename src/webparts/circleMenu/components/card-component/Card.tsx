import * as React from "react";
import { Stack, Separator } from "office-ui-fabric-react";
import { CardContextualMenu } from "../card-contextual-menu-component/CardContextualMenu";
import { PersonaComponent } from "../persona-component/PersonaComponent";
import { CardPivot } from "../card-pivot/CardPivot";
import { ICardProps } from "./ICardProps";

export const Card: React.FC<ICardProps> = React.memo(({ item, persona }) => {
  const mergePersonaProps = () => {
    return persona.map((p) => ({ ...p, imageUrl: item.imageUrl }));
  };

  return (
    <>
      <Stack horizontal horizontalAlign="start">
        <PersonaComponent persona={mergePersonaProps()} />
        <CardContextualMenu {...item} />
      </Stack>
      <Separator />
      <CardPivot />
    </>
  );
});
