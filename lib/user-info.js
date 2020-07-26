function fncUserInfo() {

    var view = document.getElementById("user-info-view");

    const method = "GET";
    const headers = {
        'Authorization': userConfig.token.token_type + ' ' + userConfig.token.access_token,
    };
    fetch("https://api-jp.kii.com/api/apps/" + appConfig.appid + "/users/me", {method, headers})
        .then((res)=> {
            return res.json();})
        .then((data)=> {
            userConfig.attribute = data;
            view.innerHTML = JSON.stringify(userConfig.attribute);
            return data;})
        .then(console.log)
        .catch(console.error);
}
