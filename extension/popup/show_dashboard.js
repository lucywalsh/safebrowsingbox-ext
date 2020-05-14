//When settings button is clicked on, open the Settings page in a new tab
var settings_button = document.getElementById("settings");
settings_button.addEventListener('click',function(){
  browser.tabs.create({url: "customise_alerts/settings.html"});
  window.close();
})

// When the Analyse button is clicked on, send a message to the background script to analyse the policy
var analyse_button = document.getElementById("alertsbutton");
analyse_button.addEventListener('click',function(){
  //send message to background script
  browser.runtime.sendMessage({command:"analysebutton"});
})

// Get the HTML elements to insert info into
var alertsnode = document.getElementById("alerts");
var alertsbutton = document.getElementById("alertsbutton");
var currenthostnode = document.getElementById("currenthost");

//dictionary mapping alert IDs to formatted text to display in UI
var alert_dict = {
  "Firstparty-tracking":"This site is tracking your activity",
  "Thirdparty-collection":"Third-parties are collecting information about you on this site",
  "Targeted-ads":"Targeted advertising is present on this site",
  "Personalisation":"This site uses your information to personalise the site to you",
  "Thirdparty-tracking":"Third-parties are tracking your activity on this site",
  "Location":"This site is collecting your location information",
  "Financial":"This site is collecting your financial information",
  "Personal":"This site collects personal information",
  "DoNotTrack":"This site ignores Do Not Track headers",
  "Health":"This site collects your health information"}

//dictionary mapping alert IDs to the link to their advice page
var advice_links = {
  "Firstparty-tracking":"<a href='advice_pages/firstparty-tracking.html' style='display:block;'>This site tracks your activity</a>",
  "Thirdparty-collection":"<a href='advice_pages/thirdparty-collection.html' style='display:block'>Third-parties are collecting information about you</a>",
  "Targeted-ads":"<a href='advice_pages/targeted-ads.html' style='display:block'>Targeted advertising is present on this site</a>",
  "Personalisation":"<a href='advice_pages/personalisation.html' style='display:block'>This site uses your information to personalise the site to you</a>",
  "Thirdparty-tracking":"<a href='advice_pages/thirdparty-tracking.html' style='display:block'>Third-parties are tracking your activity on this site</a>",
  "Location":"<a href='advice_pages/location.html' style='display:block'>This site is collecting your location information</a>",
  "Financial":"<a href='advice_pages/financial.html' style='display:block'>This site is collecting your financial information</a>",
  "Personal":"<a href='advice_pages/personal.html' style='display:block;'>This site collects personal information</a>",
  "DoNotTrack":"<a href='advice_pages/donottrack.html' style='display:block'>This site ignores Do Not Track headers</a>",
  "Health":"<a href='advice_pages/health.html' style='display:block'>This site collects your health information</a>"
}

//create and stylise div element to display alert to user
function createAlertDiv(alert,color){
  var alert_text = alert_dict[alert];
  var alertdiv = document.createElement("div");
  advice_link = advice_links[alert];
  alertdiv.innerHTML = advice_link;
  alertdiv.className = "alert-div "+alert;
  alertdiv.style="background-color:"+color;
  return alertdiv
}

// Display alerts for current host in the dashboard
browser.tabs.query({currentWindow: true, active: true})
    .then((tabs) => {
      //get current host
      var currentURL = new URL(tabs[0].url);
      var currentHost = currentURL.hostname;

      //retrieve the user's alert settings from local storage
      var alert_settings=[];
      browser.storage.local.get('alertSettings').then(function(item){
        alert_settings = Object.values(item)[0];
      });

      //retrieve alerts from local storage for current website
      browser.storage.local.get(currentHost).then(function(item){
        //if the website has not been analysed yet, give feedback to user
        if(Object.keys(item).length == 0){
          var analysing_text = document.createTextNode("Analysing policy... close and reopen this tab to recieve your alerts.");
          alertsnode.appendChild(analysing_text);
        }
        else{
          this_host_alerts = Object.values(item);
          // if local storage is blank or contains NA, policy was not successful analysed
          if(this_host_alerts[0]=='NA' || this_host_alerts[0]==""){
            //display error message to user
            var no_policy_text = document.createTextNode("Sorry, but we couldn't find the privacy policy for this website. To get alerts for this site, navigate to it's privacy policy and click 'Analyse'. We'll remember this for next time so you won't have to do it again.");
            alertsnode.appendChild(no_policy_text);
            //create button user can click on to 'manually' analyse policy
            var analyse_button = document.createElement("button");
            analyse_button.innerHTML = 'Analyse Policy';
            analyse_button.id = "analyse_button";
            analyse_button.className = 'styled-button';
            alertsbutton.appendChild(analyse_button);
            //when policy is being analysed, remove error message and display feedback to user
            analyse_button.addEventListener('click',function(){
              alertsbutton.appendChild(document.createTextNode("Analysing policy... close and reopen this tab to recieve your alerts."));
              no_policy_text.parentNode.removeChild(no_policy_text);
              analyse_button.parentNode.removeChild(analyse_button);
            });
          }
          // if local storage contains the alerts for this website, display them in dashboard
          else{
            //create elements to insert info into
          var alerts_list = document.createDocumentFragment();
          var advice_list = document.createDocumentFragment();
          //distinct, bright colours
          colors = ["#f54242","#fc8e44","#FFCC33","#52de52","#1ee3b2","#4db8ff","#b342f5"];
          // these colours are a bit similar to above colours, so only use if necessary
          backup_colors = ["#0099FF","#ff638a","#ff66c4"];
          // loop over all the alerts stored for this website
          for(i=0;i<this_host_alerts[0].length;i++){
            current_alert = this_host_alerts[0][i];
            // check if user has asked to be notified of this alert - if so, create Div element for that alert
            if(alert_settings.includes(current_alert.toLowerCase())){
              //choose random colour for alert div to prevent user habituation
              if(colors!=[]){
                color = colors[Math.floor(Math.random() * colors.length)];
                ind = colors.indexOf(color);
                colors.splice(ind,1);
              }
              // usually 7 or less alerts, but in rare case when there are more, use backup colors
              else{
                color = backup_colors[Math.floor(Math.random() * backup_colors.length)];
                ind = backup_colors.indexOf(color);
                backup_colors = backup_colors.splice(ind,1);
              }
              //create element using alert text and chosen random colour
                alerts_list.appendChild(createAlertDiv(current_alert,color));
          }
        }
        //add created elements to page
          alertsnode.appendChild(alerts_list);
        }
      }
      });
    });
