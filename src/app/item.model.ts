export class Item{
    constructor(
        private _title: string,
        private _category: string = "",
        private _imageUrl: string = "",
        private _userDescription: string = ""
        ) {

    };

    getCategory(){
        return this._category;
    }

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