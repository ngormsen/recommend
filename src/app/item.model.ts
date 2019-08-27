export class Item{
    constructor(
        private _title: string,
        private _imageUrl: string = "",
        private _userDescription: string = "") {

    };

    getTitle(){
        return this._title;
    }

    getImageUrl() {
        return this._imageUrl
    }

    getUserDescription() {
        return this._userDescription
    }
};