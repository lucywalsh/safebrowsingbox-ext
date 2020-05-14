// set previously saved settings as checked in UI
let prev_settings = [];
window.addEventListener("load", event => {
  browser.storage.local.get("alertSettings").then(item => {
    prev_settings = Object.values(item)[0];
    for (let i = 0; i < prev_settings.length; i++) {
      document.getElementById(prev_settings[i]).checked = true;
    }
  });
});

/* Code to retrieve the user's customsiation choices and save in local storage */
document.getElementById("save").onclick = function save_data() {
  let temp = [];

  let alert1 = document.getElementById("firstparty-tracking");
  if (alert1.checked) {
    temp.push("firstparty-tracking");
  }

  let alert2 = document.getElementById("targeted-ads");
  if (alert2.checked) {
    temp.push("targeted-ads");
  }

  let alert3 = document.getElementById("thirdparty-tracking");
  if (alert3.checked) {
    temp.push("thirdparty-tracking");
  }

  let alert4 = document.getElementById("thirdparty-collection");
  if (alert4.checked) {
    temp.push("thirdparty-collection");
  }

  let alert5 = document.getElementById("personal");
  if (alert5.checked) {
    temp.push("personal");
  }

  let alert6 = document.getElementById("financial");
  if (alert6.checked) {
    temp.push("financial");
  }

  let alert7 = document.getElementById("personalisation");
  if (alert7.checked) {
    temp.push("personalisation");
  }

  let alert8 = document.getElementById("donottrack");
  if (alert8.checked) {
    temp.push("donottrack");
  }

  let alert9 = document.getElementById("health");
  if (alert9.checked) {
    temp.push("health");
  }

  let alert10 = document.getElementById("location");
  if (alert10.checked) {
    temp.push("location");
  }

  let temp2 = {};
  // save in local storage
  temp2.alertSettings = temp;
  browser.storage.local.set(temp2).then(() => {
    // navigate to next settings page
    browser.tabs.update({url: "hardware_settings.html"});
  });
};
