export default class interactivemap {
constructor(mapId, onClick) {
    this.mapId = mapId;
    this.onClick = onClick;
}
async init() {
    await this.injectYMapsScript();
    await this.loadYMaps();
    this.initMap();
}
injectYMapsScript(){
    return new Promise((resolve) => {
        const ymapsScript = document.createElement('script');
        ymapsScript.src = 
        "https://api-maps.yandex.ru/2.0-stable/?apikey=26b6b034-3cd0-48a1-bea6-083ec75a27ef&load=package.standard&lang=ru-RU";     
        document.body.appendChild(ymapsScript);
        ymapsScript.addEventListener('load', resolve);
    });
}
loadYMaps(){
    return new Promise((resolve) => ymaps.ready(resolve));
}
initMap() {

    this.clusterer = new ymaps.Clusterer({
        groupByCoordinates: true,
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: false,
    });
    this.clusterer.events.add('click', (e) => {
        const coords = e.get('target').geometry.getCoordinates();
        this.onClick(coords);
});
    this.map = new ymaps.Map(this.mapId, {
        center: [55.76, 37.64],
        zoom: 10,
    });
    this.map.events.add('click', (e) => this.onClick(e.get('coords')));
    this.map.geoObjects.add(this.clusterer);
}
openBalloon(coords, content){
    this.map.balloon.open(coords, content);
}
setBalloonContent(content){
    this.map.balloon.setData(content);
}
closeBalloon(){
    this.map.balloon.close();
}
}
