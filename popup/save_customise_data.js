//set previously saved settings as checked
window.addEventListener('load',(event) => {
  browser.storage.local.get('customiseSettings').then(function(item){
    prev_settings = Object.values(item)[0];
    //change this code to update previous settings
    /*
    for(i=0;i<prev_settings.length;i++){
      document.getElementById(prev_settings[i]).checked=true;
    }
    */
  })
});

document.getElementById("save_customise").onclick = function save_customise_data(){
  var customise_settings = {};

  var userprofiling_customise = document.getElementById("user-profiling_customisedropdown");
  if(userprofiling_customise != null){
    customise_settings['user-profiling'] = userprofiling_customise.value;
  }

  var targetedadvertising_customise = document.getElementById("targeted-advertising_customisedropdown");
  if(targetedadvertising_customise != null){
    customise_settings['targeted-advertising'] = targetedadvertising_customise.value;
  }

  var datasharing_customise = document.getElementById("data-sharing_customisedropdown");
  if(datasharing_customise != null){
    customise_settings['data-sharing'] = datasharing_customise.value;
  }

  var datacollection_customise = document.getElementById("data-collection_customisedropdown");
  if(datacollection_customise != null){
    customise_settings['data-collection'] = datacollection_customise.value;
  }

  var unencryptedcomms_customise = document.getElementById("unencrypted-comms_customisedropdown");
  if(unencryptedcomms_customise != null){
    customise_settings['unencrypted-comms'] = unencryptedcomms_customise.value;
  }

  var accesstocomms_customise = document.getElementById("access-to-comms_customisedropdown");
  if(accesstocomms_customise != null){
    customise_settings['access-to-comms'] = accesstocomms_customise.value;
  }

  var thirdpartytracking_customise = document.getElementById("thirdparty-tracking_customisedropdown");
  if(thirdpartytracking_customise != null){
    customise_settings['thirdparty-tracking'] = thirdpartytracking_customise.value;
  }

  var expecteduse_customise = document.getElementById("expected-use_customisedropdown");
  if(expecteduse_customise != null){
    customise_settings['expected-use'] = expecteduse_customise.value;
  }

  var location_customise = document.getElementById("location_customisedropdown");
  if(location_customise != null){
    customise_settings['location'] = location_customise.value;
  }

  var browserfingerprinting_customise = document.getElementById("browser-fingerprinting_customisedropdown");
  if(browserfingerprinting_customise != null){
    customise_settings['browser-fingerprinting'] = browserfingerprinting_customise.value;
  }

  var temp = {};
  temp['customiseSettings'] = customise_settings;
  browser.storage.local.set(temp).then(function(){
    //tell user information is saved
    document.getElementById("saved-message").appendChild(document.createTextNode("Saved! You can now close this tab\n"));
  });

}
