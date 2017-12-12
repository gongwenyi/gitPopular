import * as service from './service';

/**
 * 获取我发布的任务列表
 * @param {number} page 当前页
 * @param {number} size 每页返回数据条数
 * @param {string} sort 排序方式
 */
export function getPopularList(q, sort = 'stars', order = 'desc') {
  return service.get('search/repositories', {
    q,
    sort,
    order,
  });
}
