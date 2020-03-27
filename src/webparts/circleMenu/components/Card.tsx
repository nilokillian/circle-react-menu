import * as React from "react";
import styles from "../styles/CircleMenu.module.scss";
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardTitle,
  DocumentCardDetails,
  DocumentCardImage,
  IDocumentCardStyles,
  IDocumentCardActivityPerson,
  ImageFit
} from "office-ui-fabric-react";
import { CardContextualMenu } from "./CardContextualMenu";

const cardStyles: IDocumentCardStyles = {
  root: {
    display: "inline-block",
    marginRight: 20,
    marginBottom: 20,
    width: 320
  }
};

export const Card: React.FunctionComponent = () => (
  <div>
    <DocumentCardImage
      height={250}
      imageFit={ImageFit.centerContain}
      imageSrc="https://downergroup.sharepoint.com/:i:/r/sites/NZCFO/SiteAssets/Images/CFOTopMenu/Evan-02.png?csf=1&e=SOrD3k"
    />
    <DocumentCardDetails>
      <DocumentCardTitle title="How to make a good design" shouldTruncate />
      <CardContextualMenu />
    </DocumentCardDetails>
    {/* <DocumentCardActivity activity="Modified March 13, 2018" people={people.slice(0, 3)} /> */}
  </div>
);
