import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

const useThunk = function (
  thunk: Function
): [Function, boolean, object | null] {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<object | null>(null);
  const dispatch = useDispatch();
  const runThunk = useCallback(
    (arg: any): Function | void => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err: object | null) => setError(err));
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error];
};

export default useThunk;
