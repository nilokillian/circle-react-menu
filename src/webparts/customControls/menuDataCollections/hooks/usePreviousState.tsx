import { useRef, useEffect } from "react";

interface IPrevParentState {
  title: string;
  uniqueId: string;
}

export const usePreviousState = (value: IPrevParentState) => {
  const ref = useRef<IPrevParentState>({} as IPrevParentState);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
