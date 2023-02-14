import { useState, useCallback } from "react";
import { useAppDispatch } from "src/store/hooks";

const useThunk = function (
  thunk: Function
): [Function, boolean, object | null] {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<object | null>(null);
  const dispatch = useAppDispatch();
  const runThunk = useCallback(
    (arg: any): Function | void => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .then((result: any) => {
          if (result.data) setIsLoading(false);
        })
        .catch((err: object | null) => {
          setIsLoading(false);
          setError(err);
        });
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error];
};

export default useThunk;
