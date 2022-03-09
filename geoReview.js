import interactivemap from './interactivemap';

export default class geoReview {
    constructor(){
        this.map = new interactivemap('map', this.onClick.bind(this));
        this.map.init().then(this.onInit.bind(this));
    }

    async onInit(){
        ///
    }
    
    async onClick(){
        ///
    }
}

