export interface IUser {
  created_at: Date;
  email: string;
  id: string;
  name: string;
  new_user: boolean;
  picture: string;
  provider: string;
  updated_at: Date;
}

export interface IBuild {
  _id: any;
  depGraphMetrics: DepGraphMetrics;
  resultMetrics: ResultMetrics;
  buildId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DepGraphMetrics {
  nodes: INode[];
  edges: IEdge[];
}

export interface INode {
  id: string;
  name: string;
  size: number;
}

export interface IEdge {
  source?: string;
  target: string;
}

export interface ResultMetrics {
  buildTime: string;
  bundleSize: number;
  plugins: Plugin[];
}

export interface Plugin {
  name: string;
  time: string;
}
