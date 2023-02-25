/*
  Note: Do not use any form of fetching in this project.
  The use of jquery, jquery UI, and dayjs is in current module and is allowed.
*/

const pastClass = "row time-block past"
const presentClass = "row time-block present"
const futureClass = "row time-block future"
var today = dayjs()

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $('.time-block').on('click', 'button', function(event){
    event.preventDefault
    let button = $(event.target)
    //console.log(event.target.nodeName)
    //console.log(typeof event.target.nodeName)
    //console.log(event.target.nodeName==='I')
    if(event.target.nodeName==='I'){
      button = button.parent()
    }
    //console.log(button)
    let parent = button.parent('.time-block')
    //console.log(parent)
    let textPrompt = parent.children('textarea')
    //console.log(textPrompt)
    let text = textPrompt.val()
    localStorage.setItem(parent.attr('id'), text)
    //console.log(localStorage.getItem(parent.attr('id')))
  })

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  //$('#hour-9').attr('class', futureClass)
  let blocks = $('.container-fluid').children()
  //console.log(blocks)
  let hour = parseInt(today.format('H'))
  console.log(hour)
  //console.log(typeof hour)
  for(let i=0; i<blocks.length; i++){
    console.log(blocks[i])
    //$(blocks[i]).attr('class', pastClass)
    let hourValue = parseInt($(blocks[i]).attr('id').match(/[0-9]+/)[0])
    console.log(hourValue)
    if(hourValue<hour){
      $(blocks[i]).attr('class', pastClass)
    }else if(hourValue>hour){
      $(blocks[i]).attr('class', futureClass)
    }else{
      $(blocks[i]).attr('class', presentClass)
    }
  }


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  


  // TODO: Add code to display the current date in the header of the page.
  let dateDisplay = $('#currentDay')
  dateDisplay.text(today.format('dddd[,] MMMM D[th]'))
  

});
