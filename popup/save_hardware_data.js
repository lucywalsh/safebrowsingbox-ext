//set previously saved settings as checked
window.addEventListener('load',(event) => {
  browser.storage.local.get('hardwareSettings').then(function(item){
    prev_settings = Object.values(item)[0];
    //change this code to update previous settings
    /*
    for(i=0;i<prev_settings.length;i++){
      document.getElementById(prev_settings[i]).checked=true;
    }
    */
  })
});

document.getElementById("save_hardware").onclick = function save_hardware_data(){
  var temp = []

  var userprofiling_mode = document.getElementById("user-profiling_modedropdown");
  if(userprofiling_mode != null){
    temp.push({'user-profiling':userprofiling_mode.value});
  }

  var targetedadvertising_mode = document.getElementById("targeted-advertising_modedropdown");
  if(targetedadvertising_mode != null){
    temp.push({'targeted-advertising':targetedadvertising_mode.value});
  }

  var datasharing_mode = document.getElementById("data-sharing_modedropdown");
  if(datasharing_mode != null){
    temp.push({'data-sharing':datasharing_mode.value});
  }

  var datacollection_mode = document.getElementById("data-collection_modedropdown");
  if(datacollection_mode != null){
    temp.push({'data-collection':datacollection_mode.value});
  }

  var unencryptedcomms_mode = document.getElementById("unencrypted-comms_modedropdown");
  if(unencryptedcomms_mode != null){
    temp.push({'unencrypted-comms':unencryptedcomms_mode.value});
  }

  var accesstocomms_mode = document.getElementById("access-to-comms_modedropdown");
  if(accesstocomms_mode != null){
    temp.push({'access-to-comms':accesstocomms_mode.value});
  }

  var thirdpartytracking_mode = document.getElementById("thirdparty-tracking_modedropdown");
  if(thirdpartytracking_mode != null){
    temp.push({'thirdparty-tracking':thirdpartytracking_mode.value});
  }

  var expecteduse_mode = document.getElementById("expected-use_modedropdown");
  if(expecteduse_mode != null){
    temp.push({'expected-use':expecteduse_mode.value});
  }

  var location_mode = document.getElementById("location_modedropdown");
  if(location_mode != null){
    temp.push({'location':location_mode.value});
  }

  var browserfingerprinting_mode = document.getElementById("browser-fingerprinting_modedropdown");
  if(browserfingerprinting_mode != null){
    temp.push({'browser-fingerprinting':browserfingerprinting_mode.value});
  }

  var temp2 = {};
  temp2['hardwareSettings'] = temp;
  browser.storage.local.set(temp2).then(function(){
    //navigate to customise settings
    browser.tabs.update({url: "customise_settings.html"});

    //document.getElementById("saved-message").appendChild(document.createTextNode("Saved! You can now close this tab\n"));
  });

}
