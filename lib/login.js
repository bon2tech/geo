function fncLogin() {
    var username = document.getElementById("username-field").value;
    var password = document.getElementById("password-field").value;

    const method = "POST";
    userConfig.info = {
        "grant_type": "password",
        "username": username,
        "password": password};
    
    const body = JSON.stringify(userConfig.info);
    const headers = {
        'Authorization': 'Basic ' + btoa(appConfig.appid + ':' + appConfig.appkey),
        'Content-Type': 'application/json'
    };
    fetch("https://api-jp.kii.com/api/apps/" + appConfig.appid + "/oauth2/token", {method, headers, body})
        .then((res)=> {
            return res.json();})
        .then((data)=> {
            userConfig.token = data;
            document.getElementById("login-page").style.display = "none";
            document.getElementById("top-page").style.display = "block";

            sessionStorage.setItem('ucfg', JSON.stringify(userConfig));
            sessionStorage.setItem('acfg', JSON.stringify(appConfig));

            return data;})
        .then(console.log)
        .catch(console.error);
}