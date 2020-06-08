import * as React from "react";
import {
  IPersonaSharedProps,
  Persona,
  PersonaSize,
} from "office-ui-fabric-react";
import { IUser } from "../../contexts/division-context/interfaces/IDivisionContext";

export interface IPersonaComponentProps {
  persona: IUser[];
}

export const PersonaComponent: React.FC<IPersonaComponentProps> = ({
  persona,
}): JSX.Element => {
  const getImageInitials = (): string => {
    let initials = persona[0].displayName.split(" ")[0].charAt(0);
    initials += " " + persona[0].displayName.split(" ")[1].charAt(0);
    return initials;
  };

  const personaPropsMapper = (): IPersonaSharedProps => {
    return {
      imageUrl: persona[0].imageUrl ? persona[0].imageUrl : "",
      imageInitials: getImageInitials(),
      text: persona[0].displayName,
      secondaryText: persona[0].jobTitle,
    };
  };

  return (
    <React.Fragment>
      <Persona
        {...personaPropsMapper()}
        size={PersonaSize.extraLarge}
        styles={{
          root: { margin: 5 },
          primaryText: { fontSize: 16, fontWeight: 500 },
        }}
      />
    </React.Fragment>
  );
};
