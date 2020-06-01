import * as React from "react";
import { Label, ILabelStyles } from "office-ui-fabric-react/lib/Label";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import { IStyleSet } from "office-ui-fabric-react/lib/Styling";
import { Stack } from "office-ui-fabric-react";

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

export const CardPivot: React.FC = () => {
  return (
    <Pivot
      aria-label="Card Pivot"
      styles={{ itemContainer: { marginTop: 10 } }}
    >
      <PivotItem
        headerText="Report 1"
        headerButtonProps={{
          "data-order": 1,
          "data-title": "My Files Title",
        }}
      >
        <div className="pivotItemContainer" style={{ height: 120 }}>
          <Stack
            horizontal
            horizontalAlign="start"
            tokens={{ childrenGap: 20 }}
            styles={{ root: { marginTop: 10 } }}
          >
            <Stack verticalAlign="start" styles={{ root: { fontSize: 12 } }}>
              <strong>ACTIVE REQUESTS</strong> 562
              <strong>RESOLVED</strong> 182
              <strong>ON HOLD</strong> 562
              <strong>TOTAL REQUESTS</strong> 3098
            </Stack>
            <Stack verticalAlign="start" styles={{ root: { fontSize: 12 } }}>
              <strong>TOTAL USERS</strong> 5045
              <strong>TOTAL LAPTOPS</strong> 562
              <strong>TOTAL SERVERS</strong> 182s
            </Stack>
          </Stack>
        </div>
      </PivotItem>
      <PivotItem headerText="Statistic">
        <div className="pivotItemContainer" style={{ height: 120 }}>
          <Label styles={labelStyles}>Graphic</Label>
        </div>
      </PivotItem>
    </Pivot>
  );
};
