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

const cardStyles: IDocumentCardStyles = {
  root: {
    display: "inline-block",
    marginRight: 20,
    marginBottom: 20,
    width: 320
  }
};

export const Card: React.FunctionComponent = () => (
  <DocumentCard
    aria-label="Document Card with image. How to make a good design. Last modified by Annie Lindqvist and 2 others in March 13, 2018."
    styles={cardStyles}
    onClickHref="http://bing.com"
  >
    <DocumentCardImage
      height={250}
      imageFit={ImageFit.centerContain}
      imageSrc="https://downergroup.sharepoint.com/:i:/r/sites/NZCFO/SiteAssets/Images/CFOTopMenu/Evan-02.png?csf=1&e=SOrD3k"
    />
    <DocumentCardDetails>
      <DocumentCardTitle title="How to make a good design" shouldTruncate />
    </DocumentCardDetails>
    {/* <DocumentCardActivity activity="Modified March 13, 2018" people={people.slice(0, 3)} /> */}
  </DocumentCard>
);
