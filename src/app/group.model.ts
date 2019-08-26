import { Item } from './item.model'

export class Group {
    constructor(
        private _name: string,
        private _items: Item[] = []) { 
    };

    getName(): string {
        return this._name;
    }; 
    
    addItem(item: Item): void {
        this._items.push(item);
    };

    getItems(): Item[]{
        return this._items;
    };

};