import { inject } from 'aurelia-framework';
import { Api } from 'services/apiService';    
import { Router } from 'aurelia-router';



@inject(
    Api,
    Router,
    )

export class LogIn  {
    public userprofile: profile;
    public email: string;
    public password: string;
    public auth: authorization;
    public log: logInModel = {};

    constructor(private api: Api, private route: Router) {}

    public async onSubmit ()  {
        this.log.email = this.email;
        this.log.password = this.password;
        
        this.auth = await this.api.logIn(this.log);
        localStorage.setItem('token', this.auth.token);
        this.userprofile = await this.api.getProfile();
        this.route.navigateToRoute('setup');
    }
}