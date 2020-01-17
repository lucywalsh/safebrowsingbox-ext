//get current URL
//console.log(document.location.href);

var privacy_urls = [
  '/privacy',
  '/privacy-policy',
  '/privacy-notice',
  '/legal/privacy',
  '/legal/privacy-policy',
  '/pages/privacy',
  '/help/privacy-policy',
  '/help/privacy-notice'
]

browser.tabs.query({currentWindow: true, active: true})
    .then((tabs) => {
      var currentURL = new URL(tabs[0].url);
      //console.log(currentURL);
      var currentHost = currentURL.hostname;
      //console.log(currentHost);

      found_policy = false
      /*
      for (i=0;i<privacy_urls.length;i++){
        console.log(i);
        var policy_url = 'http://'+currentHost+privacy_urls[i];
        fetch(policy_url).then((response) => {
          console.log(policy_url);
          console.log(response.status);
          if(response.status == 200){
            browser.tabs.create({
              active:false,
              "url": policy_url
            });
            found_policy=true;
            return;
          }
        });
      }
      */
      var i = 0;
      finished_fetching = false;
      var fetch_policy = function(){
        policy_url = 'http://'+currentHost+privacy_urls[i];
        fetch(policy_url).then((response) => {
          if(response.status==200){
            browser.tabs.create({
              active:false,
              "url": policy_url
            });
            found_policy=true;
            finished_fetching=true;
          }
          else{
            i=i+1;
            if(i<privacy_urls.length){
              fetch_policy();
            }
            else{
              finished_fetching=true;
            }
          }
        });
      }
      fetch_policy();
      // temporary analysing message in the alerts box
      //how to get these to update - content scripts?
      if(finished_fetching && !found_policy){
        var error_text = document.createTextNode("Sorry, we couldn't find the privacy policy for this website. Navigate to the privacy policy and click 'Analyse' to recieve alerts.");
        //create button
        //when privacy policy analysed, save it for later
        alerts.appendChild(error_text);
      }
      else if(finished_fetching && found_policy){
        found_text = document.createTextNode("Here are your automated alerts for this site. We've opened up the privacy policy for this site in the next tab for you to read if you see anything here that concerns you.");
        alerts.appendChild(error_text);
      }

    });
