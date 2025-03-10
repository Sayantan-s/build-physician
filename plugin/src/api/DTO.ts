import { IResponse } from "./type";

export class DTO {
  static extract<TData>(data: IResponse<TData>) {
    if (!data.success) throw new Error("");
    return data.data;
  }
}
