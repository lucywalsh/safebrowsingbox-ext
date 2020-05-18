/* Listeners to handle pop-ups that appear when user hovers over question marks on Settings page */

let firstpartytracking_button = document.getElementById("help-firstpartytracking");
let firstpartytracking_explanation = document.getElementById("firstpartytracking-explanation");
firstpartytracking_button.addEventListener("mouseenter", () => {
  firstpartytracking_explanation.style = "display:inline-block";
});

firstpartytracking_button.addEventListener("mouseleave", () => {
  firstpartytracking_explanation.style = "display:none";
});

let targetedads_button = document.getElementById("help-targetedads");
let targetedads_explanation = document.getElementById("targetedads-explanation");
targetedads_button.addEventListener("mouseenter", () => {
  targetedads_explanation.style = "display:inline-block";
});

targetedads_button.addEventListener("mouseleave", () => {
  targetedads_explanation.style = "display:none";
});

let thirdpartytracking_button = document.getElementById("help-thirdpartytracking");
let thirdpartytracking_explanation = document.getElementById("thirdpartytracking-explanation");
thirdpartytracking_button.addEventListener("mouseenter", () => {
  thirdpartytracking_explanation.style = "display:inline-block";
});

thirdpartytracking_button.addEventListener("mouseleave", () => {
  thirdpartytracking_explanation.style = "display:none";
});

let thirdpartycollection_button = document.getElementById("help-thirdpartycollection");
let thirdpartycollection_explanation = document.getElementById("thirdpartycollection-explanation");
thirdpartycollection_button.addEventListener("mouseenter", () => {
  thirdpartycollection_explanation.style = "display:inline-block";
});

thirdpartycollection_button.addEventListener("mouseleave", () => {
  thirdpartycollection_explanation.style = "display:none";
});

let personal_button = document.getElementById("help-personal");
let personal_explanation = document.getElementById("personal-explanation");
personal_button.addEventListener("mouseenter", () => {
  personal_explanation.style = "display:inline-block";
});

personal_button.addEventListener("mouseleave", () => {
  personal_explanation.style = "display:none";
});

let financial_button = document.getElementById("help-financial");
let financial_explanation = document.getElementById("financial-explanation");
financial_button.addEventListener("mouseenter", () => {
  financial_explanation.style = "display:inline-block";
});

financial_button.addEventListener("mouseleave", () => {
  financial_explanation.style = "display:none";
});

let health_button = document.getElementById("help-health");
let health_explanation = document.getElementById("health-explanation");
health_button.addEventListener("mouseenter", () => {
  health_explanation.style = "display:inline-block";
});

health_button.addEventListener("mouseleave", () => {
  health_explanation.style = "display:none";
});

let location_button = document.getElementById("help-location");
let location_explanation = document.getElementById("location-explanation");
location_button.addEventListener("mouseenter", () => {
  location_explanation.style = "display:inline-block";
});

location_button.addEventListener("mouseleave", () => {
  location_explanation.style = "display:none";
});

let personalisation_button = document.getElementById("help-personalisation");
let personalisation_explanation = document.getElementById("personalisation-explanation");
personalisation_button.addEventListener("mouseenter", () => {
  personalisation_explanation.style = "display:inline-block";
});

personalisation_button.addEventListener("mouseleave", () => {
  personalisation_explanation.style = "display:none";
});

let donottrack_button = document.getElementById("help-donottrack");
let donottrack_explanation = document.getElementById("donottrack-explanation");
donottrack_button.addEventListener("mouseenter", () => {
  donottrack_explanation.style = "display:inline-block";
});

donottrack_button.addEventListener("mouseleave", () => {
  donottrack_explanation.style = "display:none";
});
