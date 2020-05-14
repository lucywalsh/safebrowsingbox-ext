//set previously saved settings as checked in UI
window.addEventListener('load',(event) => {
  browser.storage.local.get('alertSettings').then(function(item){
    prev_settings = Object.values(item)[0];
    for(i=0;i<prev_settings.length;i++){
      document.getElementById(prev_settings[i]).checked=true;
    }
  })
});

/* Code to retrieve the user's customsiation choices and save in local storage */
document.getElementById("save").onclick = function save_data(){
  var temp = [];

  var alert1 = document.getElementById("firstparty-tracking");
  if(alert1.checked){
    temp.push('firstparty-tracking');
  }

  var alert2 = document.getElementById("targeted-ads");
  if(alert2.checked){
    temp.push('targeted-ads');
  }

  var alert3 = document.getElementById("thirdparty-tracking");
  if(alert3.checked){
    temp.push('thirdparty-tracking');
  }

  var alert4 = document.getElementById("thirdparty-collection");
  if(alert4.checked){
    temp.push('thirdparty-collection');
  }

  var alert5 = document.getElementById("personal");
  if(alert5.checked){
    temp.push('personal');
  }

  var alert6 = document.getElementById("financial");
  if(alert6.checked){
    temp.push('financial');
  }

  var alert7 = document.getElementById("personalisation");
  if(alert7.checked){
    temp.push('personalisation');
  }

  var alert8 = document.getElementById("donottrack");
  if(alert8.checked){
    temp.push('donottrack');
  }

  var alert9 = document.getElementById("health");
  if(alert9.checked){
    temp.push('health');
  }

  var alert10 = document.getElementById("location");
  if(alert10.checked){
    temp.push('location');
  }

  var temp2 = {};
  //save in local storage
  temp2['alertSettings'] = temp;
  browser.storage.local.set(temp2).then(function(){
    //navigate to next settings page
    browser.tabs.update({url: "hardware_settings.html"})
  });

}
