import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {
    private errors = [
        {
            id: 404,
            message: "Page not found",
            url: ""
        },
        {
            id: 100,
            message: "SmartApp authentication error",
            url: ""
        },
        {
            id: 201,
            message: "Not authenticated to SmartApp. Click back to login",
            url: "/login"
        },
        {
            id: 301,
            message: "Backend API proxy encountered error",
            url: ""
        }
    ];

    getMessage(id) {
        let out = this.errors.find(item => item.id == id);
        return out ? out.message : "Undefined error";
    }

    getUrl(id) {
        let out = this.errors.find(item => item.id == id);
        return out ? out.url : null;
    }
}
