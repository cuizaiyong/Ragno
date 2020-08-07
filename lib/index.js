"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ins = void 0;
const axios_1 = __importDefault(require("axios"));
const ins = axios_1.default.create({
    baseURL: 'http://127.0.0.1:3001/',
});
exports.ins = ins;
ins.interceptors.request.use((config) => {
    console.log(config);
    return config;
}, (e) => {
    console.log(e);
    return Promise.reject(e);
});
ins.interceptors.response.use((config) => {
    console.log(config);
    return config;
}, (e) => {
    console.log(e);
    return Promise.reject(e);
});
