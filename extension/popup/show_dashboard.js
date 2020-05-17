// When settings button is clicked on, open the Settings page in a new tab
let settings_button = document.getElementById("settings");
settings_button.addEventListener("click", () => {
  browser.tabs.create({url: "customise_alerts/settings.html"});
  window.close();
});

// When the Analyse button is clicked on, send a message to the background script to analyse the policy
let analyse_button = document.getElementById("alertsbutton");
analyse_button.addEventListener("click", () => {
  // send message to background script
  browser.runtime.sendMessage({command: "analysebutton"});
});

// Get the HTML elements to insert info into
let alertsnode = document.getElementById("alerts");
let alertsbutton = document.getElementById("alertsbutton");

// create and stylise div element to display alert to user
function createAlertDiv(alert, color) {
  // dictionary mapping alert IDs to the link to their advice page
  let advice_links = {
    "Firstparty-tracking": "<a href='advice_pages/firstparty-tracking.html' style='display:block;'>This site tracks your activity</a>",
    "Thirdparty-collection": "<a href='advice_pages/thirdparty-collection.html' style='display:block'>Third-parties are collecting information about you</a>",
    "Targeted-ads": "<a href='advice_pages/targeted-ads.html' style='display:block'>Targeted advertising is present on this site</a>",
    "Personalisation": "<a href='advice_pages/personalisation.html' style='display:block'>This site uses your information to personalise the site to you</a>",
    "Thirdparty-tracking": "<a href='advice_pages/thirdparty-tracking.html' style='display:block'>Third-parties are tracking your activity on this site</a>",
    "Location": "<a href='advice_pages/location.html' style='display:block'>This site is collecting your location information</a>",
    "Financial": "<a href='advice_pages/financial.html' style='display:block'>This site is collecting your financial information</a>",
    "Personal": "<a href='advice_pages/personal.html' style='display:block;'>This site collects personal information</a>",
    "DoNotTrack": "<a href='advice_pages/donottrack.html' style='display:block'>This site ignores Do Not Track headers</a>",
    "Health": "<a href='advice_pages/health.html' style='display:block'>This site collects your health information</a>"
  };
  let alertdiv = document.createElement("div");
  let advice_link = advice_links[alert];
  alertdiv.innerHTML = advice_link;
  alertdiv.className = `alert-div ${alert}`;
  alertdiv.style = `background-color:${color}`;
  return alertdiv;
}

function createAnalyseButton() {
  let analyse_button = document.createElement("button");
  analyse_button.innerHTML = "Analyse Policy";
  analyse_button.id = "analyse_button";
  analyse_button.className = "styled-button";
  return analyse_button;
}

function get_random_colours(num_colours) {
  let colours = ["#f54242", "#fc8e44", "#FFCC33", "#52de52", "#1ee3b2", "#4db8ff", "#b342f5", "#ff638a", "#ff66c4", "#0099FF"];
  let shuffled = colours.sort(() => 0.5 - Math.random());
  let random_colours = shuffled.slice(0, num_colours);
  return random_colours;
}

function createAlertList(alerts, colours) {
  let alerts_list = document.createDocumentFragment();
  for (let i = 0; i < alerts.length; i++) {
    let alert = alerts[i];
    let colour = colours[i];
    let div = createAlertDiv(alert, colour);
    alerts_list.appendChild(div);
  }
  return alerts_list;
}

// Display alerts for current host in the dashboard
browser.tabs.query({currentWindow: true, active: true})
  .then(tabs => {
    // get current host
    let currentURL = new URL(tabs[0].url);
    let currentHost = currentURL.hostname;

    // retrieve the user's alert settings from local storage
    let alert_settings = [];
    browser.storage.local.get("alertSettings").then(item => {
      alert_settings = Object.values(item)[0];
      return;
    });

    // retrieve alerts from local storage for current website
    browser.storage.local.get(currentHost).then(item => {
      // if the website has not been analysed yet, give feedback to user
      if (Object.keys(item).length === 0) {
        let analysing_text = document.createTextNode("Analysing policy... close and reopen this tab to recieve your alerts.");
        alertsnode.appendChild(analysing_text);
      }
      else {
        let this_host_alerts = Object.values(item);
        // if local storage is blank or contains NA, policy was not successful analysed
        if (this_host_alerts[0] === "NA" || this_host_alerts[0][0] === "") {
          // display error message to user
          let no_policy_text = document.createTextNode("Sorry, but we couldn't find the privacy policy for this website. To get alerts for this site, navigate to it's privacy policy and click 'Analyse'. We'll remember this for next time so you won't have to do it again.");
          alertsnode.appendChild(no_policy_text);
          // Add button that user can click on to 'manually' analyse policy
          alertsbutton.appendChild(createAnalyseButton());
          // when policy is being analysed, remove error message and display feedback to user
          analyse_button.addEventListener("click", () => {
            alertsbutton.appendChild(document.createTextNode("Analysing policy... close and reopen this tab to recieve your alerts."));
            no_policy_text.parentNode.removeChild(no_policy_text);
            analyse_button.parentNode.removeChild(analyse_button);
          });
        }
        // Display alerts in dashboard
        else {
          // From all alerts, select the ones that the user has selected in their settings
          let alerts_to_display = [];
          for (let i = 0; i < this_host_alerts[0].length; i++) {
            let current_alert = this_host_alerts[0][i];
            if (alert_settings.includes(current_alert.toLowerCase())) {
              alerts_to_display.push(current_alert);
            }
          }
          // select random colours to prevent user habituation
          let colour_list = get_random_colours(alerts_to_display.length);
          // Display these alerts in the dashboard
          alertsnode.appendChild(createAlertList(alerts_to_display, colour_list));
        }
      }
      return null;
    });
    return null;
  });
