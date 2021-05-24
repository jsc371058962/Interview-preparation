// 1. 存储路由
// 2. 执行路由相应的方法
// 3. 可以回退
class Routes {
  constructor() {
    // cache
    this.routes = {};
    this.currentRoute = '';

    // 更新路由
    this.refreshRoute = this.refreshRoute.bind(this);
    window.addEventListener('load', this.refreshRoute);
    window.addEventListener('hashchange', this.refreshRoute);
  }

  refreshRoute() {
    this.currentRoute = window.location.hash || '/';
    this.routes[this.currentRoute]();
  }

  changeRoute(hash, callback) {
    this.currentRoute = hash;
    this.routes[this.currentRoute] = callback || function () {};
  }
}
