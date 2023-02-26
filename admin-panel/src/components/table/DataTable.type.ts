export interface IDataTableColumn {
  id: string;
  title: string;
  align?: "center" | "justify" | "left" | "right";
  isPublished: boolean;
}

export interface IDataTableHeadProps {
  columns: any[];
}

export interface IDataTableProps {
  rows: [];
  columnData?: IDataTableColumn[];
  perPage: number;
  offset: number;
  filterData: [];
  columns: Array<{ field: string; headerName: string }>;
  thunkFetch: Function;
  thunkRemove: Function;
  currentPageNumber: number;
  setFilterData: Function;
  setSearchTerm: Function;
}
