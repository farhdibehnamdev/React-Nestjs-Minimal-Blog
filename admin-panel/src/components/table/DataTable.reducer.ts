type DataTableState = {
  offset: number;
  perPage: number;
  filterData?: any;
  searchTerm?: string;
};

type DataTableAction =
  | { type: "SET_OFFSET"; payload: number }
  | { type: "SET_PER_PAGE"; payload: number }
  | { type: "SET_FILTER_DATA"; payload: any }
  | { type: "SET_SEARCH_TERM"; payload: string };

const initialState: DataTableState = {
  offset: 1,
  perPage: 5,
};

const DataTableReducer = (
  state: DataTableState,
  action: DataTableAction
): DataTableState => {
  switch (action.type) {
    case "SET_OFFSET":
      return { ...state, offset: action.payload };
    case "SET_PER_PAGE":
      return { ...state, perPage: action.payload };
    case "SET_FILTER_DATA":
      return { ...state, filterData: action.payload };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
};

export { DataTableReducer, initialState };
