import { Module } from "webpack";

interface IPlugin {
  name: string;
  time: string;
}

export interface BuildMetrics {
  startTime?: [number, number];
  totalBuildTime?: string;
  plugins?: IPlugin[];
  bundleSize?: number;
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
