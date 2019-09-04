export type Category = "book" | "movie" | "series" | "other";


export class Item{
    constructor(
        private _title: string,
        private _category: Category,
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