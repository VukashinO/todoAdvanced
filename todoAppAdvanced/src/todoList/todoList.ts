import { Router } from 'aurelia-router'
import { inject } from 'aurelia-framework';
import { Api } from 'services/apiService';    



@inject(
    Router,
    Api)

export class TodoList {
    public todoList: todoItem[] = [];
    public todoItem: todoItem;
    public name:string = "Vukashin";
    public firstTodo:todoItem;
    constructor(private route: Router, private api: Api){}
    public firstName: string = this.api.getStringName();


    public async attached() {
        this.api.getTodoItems().then(data=> this.todoList = data.splice(0, 20));
        this.todoItem = await this.api.getTodoItemById(1);
    }

    public goBack() {
        this.route.navigateToRoute("landing");
    }
}