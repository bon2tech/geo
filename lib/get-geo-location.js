async function fncGetGeoLocation() {
    var loc = [];
    var predata = "";
    do{
        predata = await fncGeGioLocationReq(predata);
        if(predata.results.length != 0){
            loc = loc.concat(predata.results);
        }
    }while('nextPaginationKey' in predata);
    fncDispGeoLocation(loc);
}

function fncGeGioLocationReq(preData) {
    return new Promise((resolve, reject) => {

        const method = "POST";
        var query = {
            "bucketQuery":{
                "clause":{"type": "all"},
                "orderBy":"created",
            },
            "bestEffortLimit":10};
        if(preData){
            if('nextPaginationKey' in preData){
                query.paginationKey = preData.nextPaginationKey;
            }
        }

        var body = JSON.stringify(query);

        const headers = {
            'Authorization': userConfig.token.token_type + ' ' + userConfig.token.access_token,
            'Content-Type': 'application/vnd.kii.QueryRequest+json',
        };

        fetch("https://api-jp.kii.com/api/apps/" + appConfig.appid + "/groups/" + 
            appConfig.groupid + "/buckets/" + appConfig.bucketid + "/query", {method, headers, body})
            .then((res)=> {
                return res.json();})
            .then((data)=> {
                var records = data.results;
                console.table(records);
                for (var i = 0; i < records.length; i++) {
                    //console.log("records.length: " + i);
                    //console.log("group bucket: " + JSON.stringify(records[i]));
                }
                //return data;
                resolve(data);})
            .then(console.log)
            .catch(console.error);
    });
}

