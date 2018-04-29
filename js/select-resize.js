let selects = document.getElementsByClassName('introduction')[0].getElementsByTagName('select');
for (var i = 0; i < selects.length; i++) {
  if(!selects[i].classList.contains("width")) {
    //le faire une fois (init)
    selects[i].onchange = onSelectChange;
    let fakeEvent = {};
    fakeEvent.currentTarget = selects[i];
    onSelectChange(fakeEvent);
  }
  // selects[i].onchange = onSelectChange;
  // console.log(selects[i]);
}

function onSelectChange(event) {
  let select = event.currentTarget;
  let selectsWithSameClassName = document.getElementsByClassName(select.classList[0]);
  for (var i = 0; i < selectsWithSameClassName.length; i++) {
    if(selectsWithSameClassName[i].classList.contains("width")) {
      let widthSelect = selectsWithSameClassName[i].getElementsByClassName('widthTempOption')[0];
      widthSelect.text = select.options[ select.selectedIndex].text;
      selectsWithSameClassName[i].style.display = "inline";
      let newWidth = selectsWithSameClassName[i].offsetWidth + 2;
      select.style.width = newWidth+"px";
      selectsWithSameClassName[i].style.display = "none";
      return;
    }
  }
  // $("#widthTempOption").html($('#resizingSelectTag option:selected').text());
  //     $(this).width($("#selectTagWidth").width());
}
