export class Item{
    constructor(
        private _title: string,
        private _imageUrl: string = "") {

    };

    getTitle(){
        return this._title;
    }

    setImageUrl() {
        
    }

    getImgUrl() {
        return this._imageUrl
    }
};