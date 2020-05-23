import * as React from "react";
import { Label, ILabelStyles } from "office-ui-fabric-react/lib/Label";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import { IStyleSet } from "office-ui-fabric-react/lib/Styling";

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

export const CardPivot: React.FC = () => {
  return (
    <Pivot aria-label="Card Pivot">
      <PivotItem
        headerText="Core Functions"
        headerButtonProps={{
          "data-order": 1,
          "data-title": "My Files Title",
        }}
      >
        <Label styles={labelStyles}>IT Plan (Architecture)</Label>
        <Label styles={labelStyles}>IT Build (PMO - IT Projects)</Label>
        <Label styles={labelStyles}>
          IT Run (IT App & Environment Support)
        </Label>
        <Label styles={labelStyles}>COE Data Analytics</Label>
      </PivotItem>

      <PivotItem headerText="Key Metrics">
        <Label styles={labelStyles}>5,776 End Users / 5,199 Mailboxes</Label>
        <Label styles={labelStyles}>370TB Data / 938 Databases</Label>
        <Label styles={labelStyles}>548 Servers / 199 Applications</Label>
      </PivotItem>
      <PivotItem headerText="Statistic">
        <Label styles={labelStyles}>Pivot #3</Label>
      </PivotItem>
    </Pivot>
  );
};
