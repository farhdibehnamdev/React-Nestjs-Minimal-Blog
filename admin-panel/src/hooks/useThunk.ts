import { useState, useCallback } from "react";
import { useAppDispatch } from "src/store/hooks";

const useThunk = function (
  thunk: Function
): [Function, boolean, object | null] {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<object | null>(null);
  const dispatch = useAppDispatch();
  const runThunk = useCallback(
    (arg: any): Promise<any> => {
      setIsLoading(true);
      return new Promise((resolve, reject) => {
        dispatch(thunk(arg))
          .unwrap()
          .then((result: any) => {
            if (result.data) setIsLoading(false);
            resolve(result);
          })
          .catch((err: object | null) => {
            setIsLoading(false);
            setError(err);
            reject(err);
          });
      });
    },
    [dispatch, thunk]
  );
  return [runThunk, isLoading, error];
};

export default useThunk;
