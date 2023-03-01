/*
  Note: Do not use any form of fetching in this project.
  The use of jquery, jquery UI, and dayjs is in current module and is allowed.
*/

const pastClass = "row time-block past"
const presentClass = "row time-block present"
const futureClass = "row time-block future"
var today = dayjs()
var saveStatus = $('.save-success')

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
    if(event.target.nodeName==='I'){
      button = button.parent()
    }
    let parent = button.parent('.time-block')
    let textPrompt = parent.children('textarea')
    let text = textPrompt.val()
    localStorage.setItem(parent.attr('id'), text)
    saveStatus.text('Appointment added to local storage \u2713')
  })

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  let blocks = $('.container-fluid').children()
  let hour = parseInt(today.format('H'))
  for(let i=0; i<blocks.length; i++){
    let hourValue = parseInt($(blocks[i]).attr('id').match(/[0-9]+/)[0])
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
  
  for(let i=0; i<blocks.length; i++){
    let idKey = $(blocks[i]).attr('id')
    let textArea = $(blocks[i]).children('textarea')
    let storedValue = localStorage.getItem(idKey)
    if(storedValue!=null){
      textArea.val(storedValue)
    }
  }

  // TODO: Add code to display the current date in the header of the page.
  let dateDisplay = $('#currentDay')
  let suffix = 'th'
  let day = parseInt(today.format('D'))
  if(day%10===1){
    suffix = 'st'
  }else if(day%10===2){
    suffix = 'nd'
  }else if(day%10===3){
    suffix = 'rd'
  }
  dateDisplay.text(today.format('dddd[,] MMMM D')+suffix)
  

});
