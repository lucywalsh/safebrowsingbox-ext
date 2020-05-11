/* Listeners to handle pop-ups that appear when user hovers over question marks on Settings page */

var firstpartytracking_button = document.getElementById("help-firstpartytracking");
var firstpartytracking_explanation = document.getElementById("firstpartytracking-explanation");
firstpartytracking_button.addEventListener('mouseenter', function(){
  firstpartytracking_explanation.style = "display:inline-block";
});

firstpartytracking_button.addEventListener('mouseleave', function(){
  firstpartytracking_explanation.style = "display:none";
});

var targetedads_button = document.getElementById("help-targetedads");
var targetedads_explanation = document.getElementById("targetedads-explanation");
targetedads_button.addEventListener('mouseenter', function(){
  targetedads_explanation.style = "display:inline-block";
});

targetedads_button.addEventListener('mouseleave', function(){
  targetedads_explanation.style = "display:none";
});

var thirdpartytracking_button = document.getElementById("help-thirdpartytracking");
var thirdpartytracking_explanation = document.getElementById("thirdpartytracking-explanation");
thirdpartytracking_button.addEventListener('mouseenter', function(){
  thirdpartytracking_explanation.style = "display:inline-block";
});

thirdpartytracking_button.addEventListener('mouseleave', function(){
  thirdpartytracking_explanation.style = "display:none";
});

var thirdpartycollection_button = document.getElementById("help-thirdpartycollection");
var thirdpartycollection_explanation = document.getElementById("thirdpartycollection-explanation");
thirdpartycollection_button.addEventListener('mouseenter', function(){
  thirdpartycollection_explanation.style = "display:inline-block";
});

thirdpartycollection_button.addEventListener('mouseleave', function(){
  thirdpartycollection_explanation.style = "display:none";
});

var personal_button = document.getElementById("help-personal");
var personal_explanation = document.getElementById("personal-explanation");
personal_button.addEventListener('mouseenter', function(){
  personal_explanation.style = "display:inline-block";
});

personal_button.addEventListener('mouseleave', function(){
  personal_explanation.style = "display:none";
});

var financial_button = document.getElementById("help-financial");
var financial_explanation = document.getElementById("financial-explanation");
financial_button.addEventListener('mouseenter', function(){
  financial_explanation.style = "display:inline-block";
});

financial_button.addEventListener('mouseleave', function(){
  financial_explanation.style = "display:none";
});

var health_button = document.getElementById("help-health");
var health_explanation = document.getElementById("health-explanation");
health_button.addEventListener('mouseenter', function(){
  health_explanation.style = "display:inline-block";
});

health_button.addEventListener('mouseleave', function(){
  health_explanation.style = "display:none";
});

var location_button = document.getElementById("help-location");
var location_explanation = document.getElementById("location-explanation");
location_button.addEventListener('mouseenter', function(){
  location_explanation.style = "display:inline-block";
});

location_button.addEventListener('mouseleave', function(){
  location_explanation.style = "display:none";
});

var personalisation_button = document.getElementById("help-personalisation");
var personalisation_explanation = document.getElementById("personalisation-explanation");
personalisation_button.addEventListener('mouseenter', function(){
  personalisation_explanation.style = "display:inline-block";
});

personalisation_button.addEventListener('mouseleave', function(){
  personalisation_explanation.style = "display:none";
});

var donottrack_button = document.getElementById("help-donottrack");
var donottrack_explanation = document.getElementById("donottrack-explanation");
donottrack_button.addEventListener('mouseenter', function(){
  donottrack_explanation.style = "display:inline-block";
});

donottrack_button.addEventListener('mouseleave', function(){
  donottrack_explanation.style = "display:none";
});
