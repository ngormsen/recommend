import { Item } from './item.model'

export class Group {
    private _items: Item[] = [];

    constructor(
        private _groupId: string,
        private _name: string,
        private _isPrivate: boolean) { 
    };

    getName(): string {
        return this._name;
    }; 

    getPrivacySetting(): boolean {
        return this._isPrivate;
    }

    getGroupId(): string {
        return this._groupId;
    }
    
    addItem(item: Item): void {
        this._items.push(item);
    };

    getItems(): Item[]{
        return this._items;
    };

};