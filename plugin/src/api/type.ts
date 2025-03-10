export interface IResponse<TData> {
  requestId: string;
  status: number;
  data?: TData;
  success: boolean;
}
