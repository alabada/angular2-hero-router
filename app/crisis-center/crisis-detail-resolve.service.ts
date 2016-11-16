import {Injectable}             from '@angular/core';
import {
  Router, Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';

import {Crisis, CrisisService} from './crisis.service';

@Injectable()
export class CrisisDetailResolve implements Resolve<Crisis> {
  constructor(private cs: CrisisService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<Crisis>|boolean {
    let id = +route.params['id'];

    // 使用 CrisisService.getCrisis 方法来获取一个 承诺对象 ，用于防止路由在成功获取数据之前被加载。
    // 如果没有找到对应 Crisis ，便将用户导航回 CrisisList ，取消之前导航到危机详情的路由。
    return this.cs.getCrisis(id).then(crisis => {
      if (crisis) {
        return crisis;
      } else { // id not found
        this.router.navigate(['/crisis-center']);
        return false;
      }
    });
  }
}
