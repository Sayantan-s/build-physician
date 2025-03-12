export const moduleNameExtractor = (moduleName: string) => {
  const brokenDownPaths = moduleName.split("/");
  return brokenDownPaths[brokenDownPaths.length - 1];
};
