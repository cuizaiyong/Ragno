/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
} from 'axios';

import baseConfig from './config';

export type IMiddleFn = (
  req: AxiosInterceptorManager<AxiosRequestConfig>,
  res: AxiosInterceptorManager<AxiosResponse>
) => void;

let middlesQueue: any[] = [];

const _toString = Object.prototype.toString;
/**
 * @param fn
 */
export function use(fn: IMiddleFn | IMiddleFn[]): IMiddleFn[] | undefined {
  if (!isFunction(fn) && !Array.isArray(fn)) {
    warn(
      `If you want to register middleware through use,` +
        `when calling use, please pass in the function or array type as the parameter`
    );
    return;
  }
  middlesQueue.push(fn);
  middlesQueue = flat(middlesQueue);

  return middlesQueue as IMiddleFn[];
}

export function create(config: AxiosRequestConfig): AxiosInstance {
  config = Object.assign({}, config, baseConfig);
  const ins = axios.create(config);

  middlesQueue.forEach((middleware: IMiddleFn) => {
    middleware.call(null, ins.interceptors.request, ins.interceptors.response);
  });

  return ins;
}

function isFunction(varaiable: any): boolean {
  return _toString.call(varaiable) === '[object Function]';
}

function flat<T>(arr: T[]): T[] {
  return arr.reduce((prev: T[], cur: T) => {
    return Array.isArray(cur) ? [...prev, ...flat([...cur])] : [...prev, cur];
  }, []);
}

export function warn(info: string): void {
  console.warn(info);
}
