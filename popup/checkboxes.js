var checkboxes1 = document.querySelectorAll('input.datasharing-subOption');
checkall1 = document.getElementById('data-sharing');

for(var i=0; i<checkboxes1.length; i++) {
  checkboxes1[i].onclick = function() {
    var checkedCount = document.querySelectorAll('input.datasharing-subOption:checked').length;
    checkall1.checked = checkedCount > 0;
    checkall1.indeterminate = checkedCount > 0 && checkedCount < checkboxes1.length;
  }
}

checkall1.onclick = function() {
  for(var i=0; i<checkboxes1.length; i++) {
    checkboxes1[i].checked = this.checked;
  }
}

var checkboxes2 = document.querySelectorAll('input.datacollection-subOption');
checkall2 = document.getElementById('data-collection');

for(var i=0; i<checkboxes2.length; i++) {
  checkboxes2[i].onclick = function() {
    var checkedCount = document.querySelectorAll('input.datacollection-subOption:checked').length;
    checkall2.checked = checkedCount > 0;
    checkall2.indeterminate = checkedCount > 0 && checkedCount < checkboxes2.length;
  }
}

checkall2.onclick = function() {
  for(var i=0; i<checkboxes2.length; i++) {
    checkboxes2[i].checked = this.checked;
  }
}
