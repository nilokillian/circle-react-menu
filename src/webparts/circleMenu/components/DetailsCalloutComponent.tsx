import * as React from "react";
import {
  Callout,
  DirectionalHint,
  DefaultButton,
} from "office-ui-fabric-react";
// import { callOutStyle } from "../styles/styledObjects";

export interface ICalloutComponentProps {
  calloutHeader: string;
  currentRef: any;
  element: JSX.Element;
  cardColors?: any;
  onDismiss: () => void;
}

const coreFunctiionsData = [
  "Payroll",
  "Accounts Payables",
  "Transaction Services",
  "Systems Accounting",
];

const keyMetricsData = [
  "6,000 Employees",
  "5,000 Suppliers",
  "2,000 Customers",
];

export const DetailsCalloutComponent: React.FC = (): JSX.Element => {
  const coreFunctionsRef = React.useRef();
  const keyMetricsRef = React.useRef();
  const [callOutOpen, setCallOutOpen] = React.useState(false);
  const [currentCalloutName, setCurrentCalloutName] = React.useState<string>(
    ""
  );

  const onHandleCallOut = (name: string) => {
    setCallOutOpen(true);
    setCurrentCalloutName(name);
  };

  const keyMetricsElement = (keyMetrics: string[]): JSX.Element => {
    return (
      <ul className="coreFunctionsComponent">
        {keyMetrics.map((f) => (
          <li className="coreFunctionsComponent">{f}</li>
        ))}
      </ul>
    );
  };

  const coreFunctionsElement = (coreFunctions: string[]): JSX.Element => {
    return (
      <ul className="coreFunctionsComponent">
        {coreFunctions.map((f) => (
          <li className="coreFunctionsComponent">{f}</li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div ref={coreFunctionsRef} className="coreFunctionsArea">
        <DefaultButton
          text="Core Functions"
          styles={{
            menuIcon: { display: "none" },
            root: { width: 197, marginBottom: 4, fontSize: 12 },
          }}
          onClick={() => onHandleCallOut("coreFunctions")}
        />
      </div>
      <div ref={keyMetricsRef} className="keyMetricsArea">
        <DefaultButton
          onClick={() => onHandleCallOut("keyMetrics")}
          ref={keyMetricsRef}
          text="Key Metrics"
          styles={{
            menuIcon: { display: "none" },
            root: { width: 197, marginBottom: 4, fontSize: 12 },
          }}
        />
      </div>
      {callOutOpen && (
        <Callout
          style={{ width: 197 }}
          gapSpace={0}
          target={
            currentCalloutName === "coreFunctions"
              ? coreFunctionsRef.current
              : keyMetricsRef.current
          }
          isBeakVisible={false}
          onDismiss={() => setCallOutOpen(false)}
          directionalHint={DirectionalHint.topCenter}
          setInitialFocus={true}
          coverTarget={true}
        >
          <div className="inner">
            {currentCalloutName === "coreFunctions"
              ? coreFunctionsElement(coreFunctiionsData)
              : keyMetricsElement(keyMetricsData)}
          </div>
        </Callout>
      )}
    </>
  );
};
