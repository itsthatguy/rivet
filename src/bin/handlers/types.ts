export interface IHandlerArgs {
  version?: string | boolean;
  clean?: string;
  out?: string;
  src?: string;
  cwd?: string;
  pkg?: string;
  ignore?: string[] | boolean[];
}
