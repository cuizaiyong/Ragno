/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { warn } from '..';
export default (
  req: AxiosInterceptorManager<AxiosRequestConfig>,
  res: AxiosInterceptorManager<AxiosResponse>
): void => {
  req.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
      // 通用的配置不能被修改
      Object.defineProperty(config.headers, 'track-id', {
        value: 'test',
        configurable: true,
        enumerable: true,
        set() {
          if (process.env.NODE_ENV !== 'production') {
            warn(
              `In order to ensure the integrity of the link, ` +
                `please do not change the default configuration of the framework`
            );
          }
        },
      });
      return config;
    }
  );
  res.use(
    (config: AxiosResponse): AxiosResponse => {
      return config;
    }
  );
};
