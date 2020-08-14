/**
 * 使用node调用
 */
// axios默认不导出任何的adapter，是根据环境判断的，经过封装的axios
// 不满足Object.prototype.toString(process) === '[object process]'，因此adapter会返回undefined
// 因此需要用户主动的设置adapter
// https://github.com/axios/axios/issues/2507
const adapter = require('axios/lib/adapters/http');
const { create, use } = require('../../dist/panamera.cjs');
// panamera本身是集成了一些通用配置，如果配置有重复，以用户配置为准
const ins = create({
  baseURL: 'http://localhost:3002/',
  adapter
});
ins.get('/test').then(res => {
  console.log(res.data);
})


