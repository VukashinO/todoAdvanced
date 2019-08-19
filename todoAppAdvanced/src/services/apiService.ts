import { HttpClient} from 'aurelia-http-client';
import {inject } from 'aurelia-framework';
import  * as endPoints  from '../apiEndPoints/endPoints';


@inject(HttpClient)
export class Api {
    constructor( private client: HttpClient ) {}

    public getTodoItems () : Promise<todoItem[]>  {
        return jsonResponse<todoItem[]>(this.client.get('https://jsonplaceholder.typicode.com/todos'));
    }

    public getTodoItemById (id: number) : Promise<todoItem>  {
        return jsonResponse<todoItem>(this.client.get('https://jsonplaceholder.typicode.com/todos/' + id));
    }

    public getStringName () : string {
        return "Dejan O";
    }

    public getWithTokken ()  {
       return this.client.configure(x => {
            x.withBaseUrl(endPoints.baseUrl);
            let token:string = localStorage.getItem('token') ? localStorage.getItem('token') : "";
            if(!token) return;
            x.withHeader('Authorization', `bearer ${token}`);
        });
    }

    public async logIn (log: logInModel ) : Promise<authorization>  {
        return jsonResponse<authorization>(this.client.post(`${endPoints.baseUrl}${endPoints.logIn}`, log));
    }

    public getProfile () : Promise<profile>  {
       return jsonResponse<profile>(this.getWithTokken().get(endPoints.myProfile));
    }
}

export function jsonResponse<T>(promise: Promise<any>)  {
    return new Promise<T>((resolve, reject) => {
        promise.then((data) => {
            if (data.statusCode === 200) {
                if (data.response === '') {
                    resolve(undefined);
                } else {
                    resolve(JSON.parse(data.response, dateReviver));
                }
            }
            else if (data.statusCode === 409) {
                let exception = JSON.parse(data.response);

                if (!!exception) {
                    if (!!exception.errorMessages) {
                        reject(exception.errorMessages);
                    }
                } else {
                    reject(data.statusText);
                }
            }
            else {
                reject(data.statusText);
            }
        });
    });
}

export const dateReviver = (key: any, value: any) => {
    if (typeof value === 'string' && isDate(value)) {
        return new Date(value);
    }
    return value;
};

export const isDate = (value: any): boolean => {
    const validDates: RegExp[] = [
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d*)?$/, // yyyy-mm-ddThh:mm:ss(.mm)
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[Z,z]$/, // yyyy-mm-ddThh:mm:ssZ or yyyy-mm-ddThh:mm:ssz
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{1,6}[Z,z]$/, // yyyy-mm-ddThh:mm:ss:mmmZ or yyyy-mm-ddThh:mm:ss:mmmz
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d*)?(\+\d{2}:\d{2})?$/ // yyyy-mm-ddThh:mm:ss(.mm)(+01:00)
    ];

    for (let re of validDates) {
        if (re.test(value)) {
            return true;
        }
    }

    return false;
};