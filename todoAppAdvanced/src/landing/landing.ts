import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';


@inject(Router)
export class Landing {
    routeConfig;
    constructor(private router: Router) {}
 
    listAllTodos = () => {
       this.router.navigateToRoute('logIn');
    }
}