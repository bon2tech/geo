function fncDispGeoLocation(loc) {
    //var view = document.getElementById("map-view");

    console.table(loc);

    map = L.map('map').setView([34.9611071, 135.7905868], 18);

    /* display basemap tiles -- see others at https://leaflet-extras.github.io/leaflet-providers/preview/ */
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
    }).addTo(map);

    /* Display a point marker with pop-up text */
    //L.marker([41.77, -72.69]).addTo(map) // EDIT latitude, longitude to re-position marker
    //.bindPopup("Insert pop-up text here"); // EDIT pop-up text message
    
    
    ////var marker = L.marker([34.9312071, 135.7803868]).addTo(map)
    var marker = L.marker([loc[loc.length-1].location.lat, loc[loc.length-1].location.lon]).addTo(map)


    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

}
