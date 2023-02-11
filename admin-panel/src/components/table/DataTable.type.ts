export interface IDataTableColumn {
  id: string;
  title: string;
  align?: "center" | "justify" | "left" | "right";
  isPublished: boolean;
}

export interface IDataTableHeadProps {
  columns: IDataTableColumn[];
}

export interface IDataTableProps {
  rows: [];
  columnData?: IDataTableColumn[];
  perPage: number;
  offset: number;
  filterData: [];
}
