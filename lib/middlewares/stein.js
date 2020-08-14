"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
exports.default = (req, res) => {
    req.use((config) => {
        // 通用的配置不能被修改
        Object.defineProperty(config.headers, 'track-id', {
            value: 'test',
            configurable: true,
            enumerable: true,
            set() {
                if (process.env.NODE_ENV !== 'production') {
                    __1.warn(`In order to ensure the integrity of the link, ` +
                        `please do not change the default configuration of the framework`);
                }
            },
        });
        return config;
    });
    res.use((config) => {
        return config;
    });
};
