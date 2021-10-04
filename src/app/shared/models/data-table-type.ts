export interface DataTableType {
  complexHeaders?: {
    title: string;
    colspan: number;
    rowspan?: number;
  }[];
  columns: {
    ignore?: boolean;
    dataProperty: string;
    title: string;
    sortable: boolean;
    filterable: boolean;
  }[];
  rowActions: {
    label: string;
    actionIdToReturn: string;
    logoImageUrl: string;
    showOption(x?: any): boolean;
    class?: string;
  }[];
  rowsPerPage: number;
}
