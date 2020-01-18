var html_body = document.body.innerHTML;
var span = document.createElement('span');
span.innerHTML = html_body;
var policy_text = span.textContent;
console.log(policy_text);
