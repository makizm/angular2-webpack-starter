import { Injectable, Renderer } from '@angular/core';

@Injectable()

export class mCharm {
    private _selector:string = 'charm';
    private _element:HTMLElement;

    constructor(private _render: Renderer) {
        this._element = document.getElementById(this._selector);
    }

    public show():void {
        this._element.style['display'] = 'block';
        this._element.style['bottom'] = '';
        this._render.setElementClass(this._element,'active',true);
    }

    public hide(delay:number = 0):void {
        setTimeout(() => {
            this._element.style['display'] = 'none';
            this._render.setElementClass(this._element,'active',false);
        }, delay);
    }
}