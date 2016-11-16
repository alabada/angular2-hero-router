import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
      <h1>Angular Router</h1>
      <nav>
        <a routerLink="/crisis-center" routerLinkActive="active">Cris Center</a>
        <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
        <a routerLink="/admin" routerLinkActive="active">Admin</a>
        <a routerLink="/login" routerLinkActive="active">Login</a>
      </nav>
      <router-outlet></router-outlet> <!-- 一个模板只能有一个未命名的router-outerlet，当路由器可以支持多个命名的插座 outlet  -->
    `
})
export class AppComponent {
}
// 可以通过提供查询字符串参数为 RouterLink 提供更多情境信息，或提供一个 URL 片段（ Fragment 或 hash ）来跳转到本页面中的其它区域。 查询字符串可以由 [queryParams] 绑定来提供，它需要一个对象型参数（如 { name: 'value' } ），而 URL 片段需要一个绑定到 [fragment] 的单一值。
// RouterLinkActive 指令会基于当前的 RouterState 对象来为激活的 RouterLink 切换 CSS 类。 这会一直沿着路由树往下进行级联处理，所以父路由链接和子路由链接可能会同时激活。要改变这种行为，可以把 [routerLinkActiveOptions] 绑定到 {exact: true} 表达式。 如果使用了 { exact: true } ，那么只有在其 URL 与当前 URL 精确匹配时才会激活指定的 RouterLink 。

