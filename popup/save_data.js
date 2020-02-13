//set previously saved settings as checked
window.addEventListener('load',(event) => {
  browser.storage.local.get('alertSettings').then(function(item){
    //console.log(Object.values(item)[0]);
    prev_settings = Object.values(item)[0];
    for(i=0;i<prev_settings.length;i++){
      document.getElementById(prev_settings[i]).checked=true;
    }
  })
});

//save new settings
document.getElementById("save").onclick = function save_data(){
  var temp = [];

  var alert1 = document.getElementById("user-profiling");
  if(alert1.checked){
    temp.push('user-profiling');
  }

  var alert2 = document.getElementById("targeted-advertising");
  if(alert2.checked){
    temp.push('targeted-advertising');
  }

  var alert3 = document.getElementById("thirdparty-tracking");
  if(alert3.checked){
    temp.push('thirdparty-tracking');
  }

  var alert4 = document.getElementById("data-collection");
  if(alert4.checked){
    temp.push('data-collection');
  }

  var alert4_2 = document.getElementById("sensitive");
  if(alert4_2.checked){
    temp.push('sensitive');
  }

  var alert4_3 = document.getElementById("financial");
  if(alert4_3.checked){
    temp.push('financial');
  }

  var alert5 = document.getElementById("unencrypted-comms");
  if(alert5.checked){
    temp.push('unencrypted-comms');
  }

  var alert6 = document.getElementById("access-to-comms");
  if(alert6.checked){
    temp.push('access-to-comms');
  }

  var alert7 = document.getElementById("data-sharing");
  if(alert7.checked){
    temp.push('data-sharing');
  }

  var alert7_1 = document.getElementById("law-enforcement");
  if(alert7_1.checked){
    temp.push('law-enforcement');
  }

  var alert7_2 = document.getElementById("advertisers");
  if(alert7_2.checked){
    temp.push('advertisers');
  }

  var alert7_3 = document.getElementById("researchers");
  if(alert7_3.checked){
    temp.push('researchers');
  }

  var alert8 = document.getElementById("expected-use");
  if(alert8.checked){
    temp.push('expected-use');
  }

  var alert9 = document.getElementById("location");
  if(alert9.checked){
    temp.push('location');
  }

  var alert10 = document.getElementById("browser-fingerprinting");
  if(alert10.checked){
    temp.push('browser-fingerprinting');
  }

  var temp2 = {};
  temp2['alertSettings'] = temp;
  browser.storage.local.set(temp2).then(function(){
    //navigate to hardware settings
    browser.tabs.update({url: "hardware_settings.html"})
  });

  //close tab
  /*
  browser.tabs.query({currentWindow: true, active: true}).then( (tabs) => {
    browser.tabs.remove(tabs[0].id);
  });
  */
}
