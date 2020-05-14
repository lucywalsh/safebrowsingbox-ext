// set previously saved settings as checked in UI
window.addEventListener("load", event => {
  browser.storage.local.get("customiseSettings").then(item => {
    prev_settings = Object.values(item)[0];
  });
});

/* Code to retrieve the user's customisation choices and save in local storage */
document.getElementById("save_customise").onclick = function save_customise_data() {
  let customise_settings = {};

  let userprofiling_customise = document.getElementById("firstparty-tracking_customisedropdown");
  if (userprofiling_customise != null) {
    customise_settings["firstparty-tracking"] = userprofiling_customise.value;
  }

  let targetedadvertising_customise = document.getElementById("targeted-ads_customisedropdown");
  if (targetedadvertising_customise != null) {
    customise_settings["targeted-ads"] = targetedadvertising_customise.value;
  }

  let datasharing_customise = document.getElementById("thirdparty-collection_customisedropdown");
  if (datasharing_customise != null) {
    customise_settings["thirdparty-collection"] = datasharing_customise.value;
  }

  let datacollection_customise = document.getElementById("personalisation_customisedropdown");
  if (datacollection_customise != null) {
    customise_settings.personalisation = datacollection_customise.value;
  }

  let unencryptedcomms_customise = document.getElementById("location_customisedropdown");
  if (unencryptedcomms_customise != null) {
    customise_settings.location = unencryptedcomms_customise.value;
  }

  let accesstocomms_customise = document.getElementById("financial_customisedropdown");
  if (accesstocomms_customise != null) {
    customise_settings.financial = accesstocomms_customise.value;
  }

  let thirdpartytracking_customise = document.getElementById("thirdparty-tracking_customisedropdown");
  if (thirdpartytracking_customise != null) {
    customise_settings["thirdparty-tracking"] = thirdpartytracking_customise.value;
  }

  let expecteduse_customise = document.getElementById("personal_customisedropdown");
  if (expecteduse_customise != null) {
    customise_settings.personal = expecteduse_customise.value;
  }

  let location_customise = document.getElementById("donottrack_customisedropdown");
  if (location_customise != null) {
    customise_settings.donottrack = location_customise.value;
  }

  let browserfingerprinting_customise = document.getElementById("health_customisedropdown");
  if (browserfingerprinting_customise != null) {
    customise_settings.health = browserfingerprinting_customise.value;
  }

  let temp = {};
  temp.customiseSettings = customise_settings;
  browser.storage.local.set(temp).then(() => {
    // provide feedback - tell user information is saved
    document.getElementById("saved-message").appendChild(document.createTextNode("Saved! You can now close this tab\n"));
  });
};
