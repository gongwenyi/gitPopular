import * as service from './service';

/**
 * 获取gitPopular仓库信息
 */
export function getGitPopularInfo() {
  return service.get('repos/gongwenyi/gitPopular');
}
