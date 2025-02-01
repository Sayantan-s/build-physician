
    export type RemoteKeys = 'editor';
    type PackageType<T> = T extends 'editor' ? typeof import('editor') :any;