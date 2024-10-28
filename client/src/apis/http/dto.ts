import { IResponse } from ".";

export default class DTO {
  static extract<TData>(data: IResponse<TData>) {
    if (!data.success) throw new Error("");
    return data.data;
  }
}
