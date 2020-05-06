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

var advice_dict = {
  "Firstparty-tracking":"This site is tracking your activity",
  "Thirdparty-collection":"Consider installing an extension to block third-party cookies and remove outgoing links like Privacy Badger",
  "Targeted-ads":"1) Install an Adblocker like uBlock to stop seeing most ads - some sites will make you switch off your adblocker to use their service though, so... 2) Change your settings on the websites you use most to stop seeing targeted ads [How?] 3) Install an extension that stops third-party tracking [See examples]",
  "Personalisation":"Consider installing an extension to make user profiling more difficult [Learn more]",
  "Thirdparty-tracking":"Consider installing an extension to block third-party cookies and remove outgoing links like Privacy Badger",
  "Location":"Turn off location sharing in your browser [How?] and consider using a VPN to hide where your current location is - be careful to use a trusted VPN though, as otherwise you might be exposing your location even more! ExpressVPN and NordVPN are trustworhty.",
  "Financial":"If you are purchasing something from this website, firstly make sure you trust it. Use a safe third-party payment provider like PayPal where possible instead of providing your card details. Save your card details where possible to avoid re-entering them often - this protects you if malicious code is inserted into a trusted site [Learn more]",
  "Personal":"Avoid explicitly providing this information where possible - sites are not allowed to force you to provide personal or sensitive information. Consider installing an extension to make user profiling more difficult [Learn more]",
  "DoNotTrack":"Consider installing Privacy Badger, which keeps track of whether sites ignore Do Not Track and will aggressively block cookies if so.",
  "Health":"Consider installing an extension to make user profiling more difficult [Learn more]"
}

//stylise alert div
function createAlertDiv(alert){
  var alert_text = alert_dict[alert];
  console.log(alert_text);
  var alertdiv = document.createElement("div");
  alertdiv.appendChild(document.createTextNode(alert_text));
  alertdiv.className = "alert-div "+alert;
  //console.log("alert-div "+alert);
  return alertdiv
}

function createAdviceDiv(alert){
  //console.log(alert);
  var security_text = advice_dict[alert];
  //console.log(security_text);
  var advicediv = document.createElement("div");
  advicediv.appendChild(document.createTextNode(security_text));
  return advicediv;
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
        //console.log(alert_settings);
      });

      //retrieve alerts from local storage for current website
      browser.storage.local.get(currentHost).then(function(item){
        //if not analysed yet:
        console.log(Object.values(item));
        if(Object.keys(item).length == 0){
          var analysing_text = document.createTextNode("Analysing policy... close and reopen this tab to recieve your alerts.");
          alertsnode.appendChild(analysing_text);
        }
        else{
          this_host_alerts = Object.values(item);
          //no policy found
          if(this_host_alerts[0]=='NA'){
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
          for(i=0;i<this_host_alerts[0].length;i++){
            console.log(this_host_alerts[0][i]);
            //if(alert_settings.includes(this_host_alerts[0][i])){
              alerts_list.appendChild(createAlertDiv(this_host_alerts[0][i]));
              //advice_list.appendChild(createAdviceDiv(this_host_alerts[0][i]));
            //}
          }
          alertsnode.appendChild(alerts_list);
          //advicenode.appendChild(advice_list);
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
