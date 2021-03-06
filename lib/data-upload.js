
async function fncDataUpload() {
  //var position = await updateUserPosition();
  var position = await updateUserPosition();
  fncDataUploadReq(position);
}

function fncDataUploadReq(position) {
      var view = document.getElementById("data-upload-view");

      const method = "POST";
      var geopoint = {
            "location":{
                "_type": "point",
                "lat": position.coords.latitude,
                "lon": position.coords.longitude,},
            "date": Math.floor((new Date()).getTime()/1E3),
          };

      var body = JSON.stringify(geopoint);

      const headers = {
          'Authorization': userConfig.token.token_type + ' ' + userConfig.token.access_token,
          'Content-Type': 'application/vnd.' + appConfig.appid + '.' + appConfig.bucketid + '+json',
      };
      fetch("https://api-jp.kii.com/api/apps/" + appConfig.appid + "/groups/" + 
          appConfig.groupid + "/buckets/" + appConfig.bucketid + "/objects", {method, headers, body})
          .then((res)=> {
              return res.json();})
          .then((data)=> {
              console.table(data);
              view.innerHTML = JSON.stringify(data);
              //return data;
              //resolve(data);
            })
          .then(console.log)
          .catch(console.error);
}

/*
let userPosition = {
    latitude: null,
    longitude: null
}*/

function updateUserPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation){
        window.alert("Geolocation is not supported.");
        toggleRunning();
    }

    navigator.geolocation.getCurrentPosition(
        position => {
            //userPosition.latitude = position.coords.latitude;
            //userPosition.longitude = position.coords.longitude;
            console.log("ok:" + position.coords.latitude + " " + position.coords.longitude);
            resolve(position);
            //return position;
        },
        error => {
            window.alert("Unable to retrieve your location.");
            toggleRunning();

            var defposition = "";
            defposition.coords.latitude = 34.9511487;
            defposition.coords.longitude = 135.77060369999998;
            //return defposition;
            console.log("error:" + defposition.coords.latitude + " " + defposition.coords.longitude);
            resolve(defposition);
        }
    );
  });
}
