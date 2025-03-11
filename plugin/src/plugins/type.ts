import { Module } from "webpack";

interface IPlugin {
  name: string;
  time: string;
  size: number;
}

export interface BuildMetrics {
  startTime?: [number, number];
  totalBuildTime?: string;
  plugins?: IPlugin[];
  bundleSize?: number;
  hmrStartTime?: [number, number];
  hmrTime?: string;
}

export interface TimedModule extends Module {
  startTime?: [number, number];
  loaders?: string[];
  loadTime?: number;
}

export interface IResultMetrics {
  buildTime?: string;
  bundleSize?: number;
  plugins?: IPlugin[];
  hmrTime?: string;
}

interface INode {
  id: string | number;
  name: string;
  size: number;
}

interface IEdge {
  source: string | number;
  target: string | number;
}

export interface DepGraphMetrics {
  nodes: INode[];
  edges: IEdge[];
}

export interface IResults {
  resultMetrics?: IResultMetrics;
  depGraphMetrics?: DepGraphMetrics;
}

export const PLUGIN_NAME = "BuildPhysician" as const;

export interface IConstructor {
  emitOnBuildCompete?: (
    result: IResults & {
      buildId: string;
    }
  ) => void;
}
