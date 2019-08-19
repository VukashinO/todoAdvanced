import {RouterConfiguration, Router} from 'aurelia-router';
import { PLATFORM } from "aurelia-framework";

export class App {
  router:Router;
  configureRouter(config: RouterConfiguration, router: Router): void {
    config.title = 'TodoApp';
    config.map([
      { route: '', name: 'landing', moduleId: PLATFORM.moduleName('./landing/landing'), title:'Landing-view' },
      { route: 'todoList', name: 'todo', moduleId: PLATFORM.moduleName('./todoList/todoList'), title:'Todo-view' },
      { route: 'login', name: 'login', moduleId: PLATFORM.moduleName('login/login'), title:'login-view' },
      { route: 'setup', name: 'setup', moduleId: PLATFORM.moduleName('./setup/setup'), title:'Setup-view' }
    ]);
    this.router = router;
  }
}
