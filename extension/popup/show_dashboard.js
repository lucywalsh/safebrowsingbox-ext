//settings button
var settings_button = document.getElementById("settings");
settings_button.addEventListener('click',function(){
  browser.tabs.create({url: "settings.html"});
  window.close();
})

//help button + popup
//var help_modal = document.getElementById("myModal");

var help_button = document.getElementById("help");
help_button.addEventListener('click',function(){
  //modal.style.display =
})

//analyse button
var analyse_button = document.getElementById("alertsbutton");
analyse_button.addEventListener('click',function(){
  //send message to background script
  browser.runtime.sendMessage({command:"analysebutton"});
})

//nodes to insert info into browser extension popup
var alertsnode = document.getElementById("alerts");
var alertsbutton = document.getElementById("alertsbutton");
var currenthostnode = document.getElementById("currenthost");
//var advicenode = document.getElementById("advice");

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

//stylise alert div
function createAlertDiv(alert,color){
  var alert_text = alert_dict[alert];
  var alertdiv = document.createElement("div");
  advice_link = advice_links[alert];
  alertdiv.innerHTML = advice_link;
  alertdiv.className = "alert-div "+alert;
  alertdiv.style="background-color:"+color;
  return alertdiv
}

//display alerts for current host
browser.tabs.query({currentWindow: true, active: true})
    .then((tabs) => {
      var currentURL = new URL(tabs[0].url);
      var currentHost = currentURL.hostname;
      //var currentHostTextNode = document.createTextNode(currentHost);
      //currenthostnode.appendChild(currentHostTextNode);
      var alert_settings=[];

      //get alert settings
      browser.storage.local.get('alertSettings').then(function(item){
        //console.log(Object.values(item)[0]);
        alert_settings = Object.values(item)[0];
      });

      //retrieve alerts from local storage for current website
      browser.storage.local.get(currentHost).then(function(item){
        //if not analysed yet:
        if(Object.keys(item).length == 0){
          var analysing_text = document.createTextNode("Analysing policy... close and reopen this tab to recieve your alerts.");
          alertsnode.appendChild(analysing_text);
        }
        else{
          this_host_alerts = Object.values(item);
          //no policy found
          if(this_host_alerts[0]=='NA' || this_host_alerts[0]==""){
            var no_policy_text = document.createTextNode("Sorry, but we couldn't find the privacy policy for this website. To get alerts for this site, navigate to it's privacy policy and click 'Analyse'. We'll remember this for next time so you won't have to do it again.");
            alertsnode.appendChild(no_policy_text);
            var analyse_button = document.createElement("button");
            analyse_button.innerHTML = 'Analyse Policy';
            analyse_button.id = "analyse_button";
            analyse_button.className = 'styled-button';
            alertsbutton.appendChild(analyse_button);
            analyse_button.addEventListener('click',function(){
              alertsbutton.appendChild(document.createTextNode("Analysing policy... close and reopen this tab to recieve your alerts."));
              no_policy_text.parentNode.removeChild(no_policy_text);
              analyse_button.parentNode.removeChild(analyse_button);
            });
          }
          else{
          var alerts_list = document.createDocumentFragment();
          var advice_list = document.createDocumentFragment();
          colors = ["#f54242","#fc8e44","#FFCC33","#52de52","#1ee3b2","#4db8ff","#b342f5"];
          backup_colors = ["#0099FF","#ff638a","#ff66c4"];
          for(i=0;i<this_host_alerts[0].length;i++){
            current_alert = this_host_alerts[0][i];
            if(alert_settings.includes(current_alert.toLowerCase())){
              if(colors!=[]){
                color = colors[Math.floor(Math.random() * colors.length)];
                ind = colors.indexOf(color);
                colors.splice(ind,1);
              }
              else{
                color = backup_colors[Math.floor(Math.random() * backup_colors.length)];
                ind = backup_colors.indexOf(color);
                backup_colors = backup_colors.splice(ind,1);
              }
                alerts_list.appendChild(createAlertDiv(current_alert,color));
          }
        }
          alertsnode.appendChild(alerts_list);
        }
      }
      });
    });

/*
function listenForClicks() {
  document.addEventListener("click", (e) => {

    //add functions to do things on click here

    function reportError(error) {
      console.error(`Could not analyse: ${error}`);
    }

    /**
    if (e.target.classList.contains("something")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(//call function)
        .catch(reportError);
    }
    else if (e.target.classList.contains("something")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(//call function)
        .catch(reportError);
    }

  });
}
*/
