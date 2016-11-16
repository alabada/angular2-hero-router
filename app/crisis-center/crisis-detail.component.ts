import {
  Component, OnInit, HostBinding,
  trigger, transition,
  animate, style, state
}  from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Crisis}         from './crisis.service';
import {DialogService}  from '../dialog.service';
@Component({
  template: `
  <div *ngIf="crisis">
    <h3>"{{editName}}"</h3>
    <div>
      <label>Id: </label>{{crisis.id}}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="editName" placeholder="name"/>
    </div>
    <p>
      <button (click)="save()">Save</button>
      <button (click)="cancel()">Cancel</button>
    </p>
  </div>
  `,
  styles: ['input {width: 20em}'],
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class CrisisDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'absolute';
  }

  crisis: Crisis;
  editName: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public dialogService: DialogService) {
  }

  ngOnInit() {
    // 使用 Resolve 守卫通过 crisis 属性提供的 ActivatedRoute.data
    this.route.data.forEach((data: { crisis: Crisis }) => {
      this.editName = data.crisis.name;
      this.crisis = data.crisis;
    });
  }

  cancel() {
    this.gotoCrises();
  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }

  canDeactivate(): Promise<boolean> | boolean {
    // canDeactivate 方法 可以 同步返回，如果没有危机，或者没有未定的修改，它就立即返回 true 。
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // 它也可以返回一个承诺（ Promise ）或可观察对象（ Observable ），路由器将等待它们被解析为真值（继续导航）或假值（留下）
    return this.dialogService.confirm('Discard changes?');
  }

  gotoCrises() {
    let crisisId = this.crisis ? this.crisis.id : null;
    // Pass along the crisis id if available
    // so that the CrisisListComponent can select that crisis.
    // Add a totally useless `foo` parameter for kicks.
    // Relative navigation back to the crises
    this.router.navigate(['../', {id: crisisId, foo: 'foo'}], {relativeTo: this.route}); // 相对导航

    /**
     * 如果我们正在使用 RouterLink 进行导航，而不是 Router 服务，仍然可以使用 相同的 链接参数数组，不过我们不用提供带 relativeTo 属性的对象。
     * 在 RouterLink 指令中 ActivatedRoute 是默认的。
     *
     * <a [routerLink]="[crisis.id]">{{ crisis.name }}</a>
     */
  }
}
