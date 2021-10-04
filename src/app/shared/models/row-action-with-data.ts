export interface RowActionWithData<T> {
  actionToPerfom: string;
  rowData?: T;
}
