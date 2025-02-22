import { useCallback, useMemo, useState } from "react";
import { useAfterInit } from "./useAfterInit";
import { useWindowSize } from "./useWindowSize";

interface ReturnType {
  x: number;
  y: number;
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
}

const emptyVal: ReturnType = {
  x: 0,
  y: 0,
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
};

/**
 * @param {Array} [changeArr] - The callback array for change handling
 * @param {Function} [changeFunc] - The function used to modify the bounding box sizing
 * @param {number} [debounceMs] - The time to debounce the window size by
 * @returns {Object}
 * @returns {React.RefObject} 0.ref - The ref to associate with the item
 * @returns {React.RefObject} 0.val - The return of `getBoundingBox` of the ref
 */
export const useElementBounds = (
  changeArr: any[],
  changeFunc: (a: ReturnType) => ReturnType = (a: ReturnType) => a,
  debounceMs: number = 150
): { ref: (el: HTMLElement) => void; val: ReturnType } => {
  const [val, setVal] = useState<ReturnType>(emptyVal);
  const afterInit = useAfterInit();
  const windowSize = useWindowSize(debounceMs);

  const diffArr = useMemo(
    () => [...changeArr, windowSize, emptyVal, afterInit],
    [changeArr, windowSize, afterInit]
  );

  const ref = useCallback(
    (reff: HTMLElement) => {
      if (reff) {
        setVal(changeFunc(reff.getBoundingClientRect()));
        return;
      }
      setVal(changeFunc(emptyVal));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    diffArr
  );

  return {
    ref,
    val,
  };
};
