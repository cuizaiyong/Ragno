import { AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
export declare type IMiddleFn = (req: AxiosInterceptorManager<AxiosRequestConfig>, res: AxiosInterceptorManager<AxiosResponse>) => void;
/**
 * @param fn
 */
export declare function use(fn: IMiddleFn | IMiddleFn[]): IMiddleFn[] | undefined;
export declare function create(config: AxiosRequestConfig): AxiosInstance;
export declare function warn(info: string): void;
