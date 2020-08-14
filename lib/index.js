"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.warn = exports.create = exports.use = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("./config"));
let middlesQueue = [];
const _toString = Object.prototype.toString;
/**
 * @param fn
 */
function use(fn) {
    if (!isFunction(fn) && !Array.isArray(fn)) {
        warn(`If you want to register middleware through use,` +
            `when calling use, please pass in the function or array type as the parameter`);
        return;
    }
    middlesQueue.push(fn);
    middlesQueue = flat(middlesQueue);
    return middlesQueue;
}
exports.use = use;
function create(config) {
    config = Object.assign({}, config, config_1.default);
    const ins = axios_1.default.create(config);
    middlesQueue.forEach((middleware) => {
        middleware.call(null, ins.interceptors.request, ins.interceptors.response);
    });
    return ins;
}
exports.create = create;
function isFunction(varaiable) {
    return _toString.call(varaiable) === '[object Function]';
}
function flat(arr) {
    return arr.reduce((prev, cur) => {
        return Array.isArray(cur) ? [...prev, ...flat([...cur])] : [...prev, cur];
    }, []);
}
function warn(info) {
    console.warn(info);
}
exports.warn = warn;
