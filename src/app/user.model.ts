import { Group } from './group.model';

export class User {

    constructor(
        private _name: string,
        private _email: string = "",
        private _groups: Group[] = []
    ) {

    }

    getName() {
        return this._name;
    }

    getEmail() {
        return this._email;
    }

    getGroups() {
        return this._groups;
    }
}