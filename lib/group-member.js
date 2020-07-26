function fncGroupMember() {

  var view = document.getElementById("group-member-view");

  const method = "GET";
  const headers = {
      'Authorization': userConfig.token.token_type + ' ' + userConfig.token.access_token,
  };
  fetch("https://api-jp.kii.com/api/apps/" + appConfig.appid + "/groups/" + 
      appConfig.groupid + "/members", {method, headers})
      .then((res)=> {
          return res.json();})
      .then((data)=> {
          userConfig.attribute = data;
          view.innerHTML = JSON.stringify(userConfig.attribute);
          return data;})
      .then(console.log)
      .catch(console.error);
}




function getGroupMemberInfo(){
  var groupMemberView = document.getElementById("group-member-view");
  groupMemberView.innerHtml = ""; 
  // ... When the group is created ...

  // Get the ID of the existing group.
  ////var groupID = group.getID();

  // ... When you need to access the group ...

  // Instantiate the group again.
  var group = KiiGroup.groupWithID("3x03dwvh8zhnqtjg3qbpyzgb3");
  ////var group2 = KiiGroup.groupWithID(groupID);

  // Refresh the group to retrieve the latest data from Kii Cloud.
  group.refresh().then(
    function(theGroup) {
      // Do something.
      console.log("Group Info: " + JSON.stringify(theGroup));
      groupMemberView.innerHTML = JSON.stringify(theGroup);
    }
  ).catch(
    function(error) {
      var theGroup = error.target;
      var errorString = error.message;
      // Handle the error.
    }
  );

  // Get a list of members of the group.
  group.getMemberList().then(
    function(params) {
      var group = params[0];
      var memberList = params[1];

      // Refresh the members to retrieve the latest data from Kii Cloud.
      return refreshAllMembers(memberList);
    }
  ).then(
    function(members) {
      // Do something.
      var list = "";
      for (var i = 0; i < members.length; i++) {
        var m = members[i];
        console.log("DisplayName: %s %s", m._username, m._uuid);
        list = list + m._username + " " + m._uuid + "<br>";
      }
      groupMemberView.innerHTML = groupMemberView.innerHTML + "<br>" + list;
    }
  ).catch(
    function(error) {
      // Handle the error.

      // Get the group for the failed getMemberList() method.
      var thrGroup = error.target;
      // Get the user for the failed refresh() method.
      var theUser = error.target;
      // Get the error message.
      var errorString = error.message;
    }
  );  

}


function refreshAllMembers(members) {
  var list = members.concat();
  var refreshRecurr = function() {
    var member = list.shift();
    if (member === void(0)) {
      return Promise.resolve(members);
    }
    return member.refresh().then(refreshRecurr);
  };
  return refreshRecurr();
}