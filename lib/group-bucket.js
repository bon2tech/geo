
async function fncGroupBucket() {
    var predata = "";
    do{
        predata = await fncGroupBucketReq(predata);
    }while('nextPaginationKey' in predata);
}


function fncGroupBucketReq(preData) {
    return new Promise((resolve, reject) => {
        var view = document.getElementById("group-bucket-view");

        const method = "POST";
        var query = {
            "bucketQuery":{
                "clause":{
                    "type": "all"}
            },
            "bestEffortLimit":2};
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
                    view.innerHTML = view.innerHTML  + "<br>" + JSON.stringify(records[i]);
                }
                //return data;
                resolve(data);})
            .then(console.log)
            .catch(console.error);
    });
}


//==========================================================================
//==========================================================================
//以下はゴミ
//==========================================================================
//==========================================================================

function fncGroupBucket3() {

    var view = document.getElementById("group-bucket-view");
    
    do{
        const method = "POST";
        var query = {
            "bucketQuery":{
                "clause":{
                    "type": "all"}
            },
            "bestEffortLimit":3};
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
                    view.innerHTML = view.innerHTML  + "<br>" + JSON.stringify(records[i]);
                }

                if('nextPaginationKey' in data){
                    query.paginationKey = data.nextPaginationKey;
                }

                return records;})
            .then(console.log)
            .catch(console.error);

    } while ('paginationKey' in query);
    //} while (paginationKey != "");

    loadAllFiles();
}



function fncGroupBucket2() {

    var view = document.getElementById("group-bucket-view");

    const method = "POST";
    const body = JSON.stringify({
        "bucketQuery":{
            "clause":{
                "type": "all"}
          },
          "bestEffortLimit":3});
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
                view.innerHTML = view.innerHTML  + "<br>" + JSON.stringify(records[i]);
              }


            return records;})
        .then(console.log)
        .catch(console.error);
}





async function fncGroupBucket4() {
    var predata = "";
    do{
        predata = await fncGroupBucketReq(predata);
    }while('nextPaginationKey' in predata);

    console.log('done!');
}

function fncGroupBucketReq4(preData) {
    var view = document.getElementById("group-bucket-view");

    const method = "POST";
    var query = {
        "bucketQuery":{
            "clause":{
                "type": "all"}
        },
        "bestEffortLimit":3};
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
    const p = new Promise((resolve, reject) => {
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
                    view.innerHTML = view.innerHTML  + "<br>" + JSON.stringify(records[i]);
                }

                return data;})
            .then(console.log)
            .catch(console.error);});

        //return p;
}