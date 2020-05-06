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
var advicenode = document.getElementById("advice");

var alert_dict = {
  'user-profiling':'This site conducts user profiling',
  'targeted-advertising':'This site contains targeted advertising',
  'thirdparty-tracking':'This site tracks your activity across the web',
  'sensitive':'This site collects sensitive characteristics',
  'financial':'This site collects your financial information',
  'selling-data':'This site sells your data to third-parties',
  'law-enforcement':'This site gives data to to Law Enforcement in some circumstances',
  'advertisers':'This site sells data to advertisers',
  'researchers':'This site gives or sells data to researchers',
  'unencrypted-comms':'The communcations you send on this site are unencrypted',
  'access-to-comms':"This site has access to your personal communications",
  'data-sharing':'This site shares your information with third-parties',
  'data-retention':'This site keeps your data for an indefinite amount of time',
  'expected-use':'This site uses data for purposes you would not expect',
  'location':'This site collects location information',
  'browser-fingerprinting':'This site uniquely identifies you without your explicit consent'
}

var advice_dict = {
  'user-profiling':'Provide as little information as possible to this website. Consider installing Privacy Possum, which falsifies some data sent to the websites you browse to make it harder for them to track and profile you.',
  'targeted-advertising':'1) Install an Adblocker like uBlock to stop seeing most ads - some sites will make you switch off your adblocker to use their service though, so... 2) Change your settings on the websites you use most to stop seeing targeted ads [How?] 3) Install an extension that stops third-party tracking [See examples]',
  'third-party tracking':'Consider installing an extension to block third-party cookies and remove outgoing links like Privacy Badger',
  'sensitive-characteristics':'Avoid explicitly providing this information where possible - sites are not allowed to force you to provide this information. Consider installing an extension to make user profiling more difficult [Learn more]',
  'financial-information':'If you are purchasing something from this website, firstly make sure you trust it. Use a safe third-party payment provider like PayPal where possible instead of providing your card details. Save your card details where possible to avoid re-entering them often - this protects you if malicious code is inserted into a trusted site [Learn more].',
  'selling-data':'Provide as little information as possible to this website - consider using a fake email address and other details, which you can do automatically with extensions like Bloody Vikings and Privacy Possum.',
  'law-enforcement':'If you are not comfortable with your information being provided to law enforcement, consider using fake details which you can generate safely with browser extensions like Bloody Vikings and Privacy Possum.',
  'advertisers':'If you are not comfortable with your information being provided to advertisers, consider using fake details which you can generate safely with browser extensions like Bloody Vikings and Privacy Possum.',
  'researchers':'If you are not comfortable with your information being provided to researchers, consider using fake details which you can generate safely with browser extensions like Bloody Vikings and Privacy Possum.',
  'unencrypted-comms':'Avoid sending any sensitive or private information in messages that you would not want the world to know. Consider using a secure end-to-end encrypted messaging service like Whatsapp or Telegram. For email, you can use ProtonMail.',
  'access-to-comms':"Avoid sending any information that you would not be comfortable with the provider of this site being able to see and potentially pass on to third-parties. Consider using a secure end-to-end encrypted messaging service like Whatsapp or Telegram. For email, you can use ProtonMail.",
  'data-sharing':'Avoid explicitly providing any information to this site that you would not be comfortable being shared with other companies that you might not have heard of - you do not have control over your information anymore after this happens. Consider providing fake information if you really need to use this service.',
  'data-retention':'If you do not want this website to store your data anymore, you can send a Data Deletion Notice which they are obliged to comply with. Find a template [here], or you use [this service] to automate some of it for you. Note that your account will be deleted and you will not be able to use the service anymore. ',
  'expected-use':'Read the privacy policy of this website, especially the section about how your data is used, and check that you are happy with this. [Polisis] can help you to understand which data is being used for which purpose. ',
  'location':'Turn off location sharing in your browser [How?] and consider using a VPN to hide where your current location is - be careful to use a trusted VPN though, as otherwise you might be exposing your location even more! ExpressVPN and NordVPN are trustworhty.',
  'browser-fingerprinting':'Consider installing Privacy Possum, which falsifies some data sent to the websites you browse to make it harder for them to track and profile you.'
}

//stylise alert div
function createAlertDiv(alert){
  var alert_text = alert_dict[alert];
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
        //console.log(Object.values(item));
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
            //console.log(this_host_alerts[0][i]);
            //if(alert_settings.includes(this_host_alerts[0][i])){
              alerts_list.appendChild(createAlertDiv(this_host_alerts[0][i]));
              //advice_list.appendChild(createAdviceDiv(this_host_alerts[0][i]));
            //}
          }
          alertsnode.appendChild(alerts_list);
          advicenode.appendChild(advice_list);
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