import * as React from "react";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import { Stack } from "office-ui-fabric-react";
import { ChartComponent } from "../chart-component/Chart.component";
import data from "../chart-component/mockData";

export interface ICardPivotProps {
  divisionId: string;
}

export const CardPivot: React.FC<ICardPivotProps> = ({ divisionId }) => {
  return (
    <Pivot aria-label="Card Pivot" styles={{ text: { fontSize: 14 } }}>
      <PivotItem
        headerText="Statistic"
        headerButtonProps={{
          "data-order": 1,
          "data-title": "My Files Title",
        }}
      >
        <div className="pivotItemContainer" style={{ height: 140 }}>
          <Stack
            horizontal
            horizontalAlign="start"
            tokens={{ childrenGap: 20 }}
            styles={{ root: { marginTop: 10 } }}
          >
            <Stack verticalAlign="start" styles={{ root: { fontSize: 12 } }}>
              {divisionId &&
                data[divisionId].statisticData.map((i) => (
                  <>
                    <strong>{i.title}</strong>
                    {i.value}
                  </>
                ))}
            </Stack>
            {/* <Stack verticalAlign="start" styles={{ root: { fontSize: 12 } }}>
              <strong>ACTIVE REQUESTS</strong> 562
              <strong>RESOLVED</strong> 182
              <strong>ON HOLD</strong> 562
              <strong>TOTAL REQUESTS</strong> 3098
            </Stack>
            <Stack verticalAlign="start" styles={{ root: { fontSize: 12 } }}>
              <strong>TOTAL USERS</strong> 5045
              <strong>TOTAL LAPTOPS</strong> 562
              <strong>TOTAL SERVERS</strong> 182s
            </Stack> */}
          </Stack>
        </div>
      </PivotItem>
      <PivotItem headerText="Chart">
        <div className="pivotItemContainer" style={{ height: 140 }}>
          <ChartComponent dataId={divisionId} />
        </div>
      </PivotItem>
    </Pivot>
  );
};
