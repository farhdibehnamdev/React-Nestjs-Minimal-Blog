import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

type ThunkType = {
  runThunk: Function | void;
};

const useThunk = function (
  thunk: Function
): [Function | void, boolean, string | null] {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const runThunk = useCallback((): Function | void => {
    setIsLoading(true);
    dispatch(thunk())
      .unwrap()
      .catch((err: string | null) => setError(err));
  }, [dispatch, thunk]);
  return [runThunk, isLoading, error];
};

export default useThunk;
