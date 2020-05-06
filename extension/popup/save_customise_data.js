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

  var userprofiling_customise = document.getElementById("firstpartytracking_customisedropdown");
  if(userprofiling_customise != null){
    customise_settings['firstparty-tracking'] = userprofiling_customise.value;
  }

  var targetedadvertising_customise = document.getElementById("targeted-ads_customisedropdown");
  if(targetedadvertising_customise != null){
    customise_settings['targeted-ads'] = targetedadvertising_customise.value;
  }

  var datasharing_customise = document.getElementById("thirdpartycollection_customisedropdown");
  if(datasharing_customise != null){
    customise_settings['thirdparty-collection'] = datasharing_customise.value;
  }

  var datacollection_customise = document.getElementById("personalisation_customisedropdown");
  if(datacollection_customise != null){
    customise_settings['personalisation'] = datacollection_customise.value;
  }

  var unencryptedcomms_customise = document.getElementById("location_customisedropdown");
  if(unencryptedcomms_customise != null){
    customise_settings['location'] = unencryptedcomms_customise.value;
  }

  var accesstocomms_customise = document.getElementById("financial_customisedropdown");
  if(accesstocomms_customise != null){
    customise_settings['financial'] = accesstocomms_customise.value;
  }

  var thirdpartytracking_customise = document.getElementById("thirdparty-tracking_customisedropdown");
  if(thirdpartytracking_customise != null){
    customise_settings['thirdparty-tracking'] = thirdpartytracking_customise.value;
  }

  var expecteduse_customise = document.getElementById("personal_customisedropdown");
  if(expecteduse_customise != null){
    customise_settings['personal'] = expecteduse_customise.value;
  }

  var location_customise = document.getElementById("donottrack_customisedropdown");
  if(location_customise != null){
    customise_settings['donottrack'] = location_customise.value;
  }

  var browserfingerprinting_customise = document.getElementById("health_customisedropdown");
  if(browserfingerprinting_customise != null){
    customise_settings['health'] = browserfingerprinting_customise.value;
  }

  var temp = {};
  temp['customiseSettings'] = customise_settings;
  browser.storage.local.set(temp).then(function(){
    //tell user information is saved
    document.getElementById("saved-message").appendChild(document.createTextNode("Saved! You can now close this tab\n"));
  });

}
