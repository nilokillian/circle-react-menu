import * as React from "react";
import {
  IPersonaSharedProps,
  Persona,
  PersonaSize,
} from "office-ui-fabric-react";
// import { sendEmail } from "../utils/helper";
// import { PersonaDetails } from "./PesonaDetails";
// import { CalloutComponent } from "./CalloutComponent";
import { RefObject, useState } from "react";
import { IUser } from "../../contexts/division-context/interfaces/IDivisionContext";

export interface IPersonaComponentProps {
  persona: IUser[];
  // componentRef: RefObject<HTMLDivElement>;
}

export const PersonaComponent: React.FC<IPersonaComponentProps> = ({
  persona,
  // componentRef,
}): JSX.Element => {
  const [isCalloutVisible, setIsCalloutVisible] = useState<boolean>(false);

  //   const renderCallout = (): JSX.Element => {
  //     return (
  //       <CalloutComponent
  //         calloutHeader={persona[0].jobTitle}
  //         element={
  //           <PersonaDetails
  //             currentUser={persona[0]}
  //             sendEmail={() => sendEmail(persona[0].email)}
  //           />
  //         }
  //         currentRef={componentRef}
  //         onDismiss={() => setIsCalloutVisible(false)}
  //       />
  //     );
  //   };

  const getImageInitials = () => {
    let initials = persona[0].displayName.split(" ")[0].charAt(0);
    initials += " " + persona[0].displayName.split(" ")[1].charAt(0);
    return initials;
  };

  const mapper = (): IPersonaSharedProps => {
    return {
      imageUrl: persona[0].imageUrl,
      imageInitials: getImageInitials(),
      text: persona[0].displayName,
      secondaryText: persona[0].jobTitle,
    };
  };

  return (
    <React.Fragment>
      <Persona
        {...mapper()}
        size={PersonaSize.extraLarge}
        styles={{ root: { margin: 15, cursor: "pointer" } }}
        onClick={() => setIsCalloutVisible(true)}
      />
      {/* {isCalloutVisible && renderCallout()} */}
    </React.Fragment>
  );
};
