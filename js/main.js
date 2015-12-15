// global variables

var names = []; //names array of objects to store the secret santa data
var mailtxt = {};

// var mailtxt = {
//   date: "23.12.2015",
//   amount: 15,
//   currency: ["EUR", "&euro;"]
//   }; //holds everything else (date, amount, currency and the message)

//Prevent default behaviour of all buttons
$("button").click(function (event) {
  event.preventDefault();
});

$("#names-review-form").on("click", function() {
  goBack("#form-5", "#form-1");
});
$("#date-review-form").on("click", function() {
  goBack("#form-5", "#form-2");
});
$("#amount-review-form").on("click", function() {
  goBack("#form-5", "#form-3");
});
$("#message-review-form").on("click", function() {
  goBack("#form-5", "#form-4");
});

//Basic Form behaviour

//Blur everything except the forms
function blurIt() {
  document.getElementById("nav").style.display = 'none';
  $("#learnmore, #nav, footer, header, #clock, .btn-down").css({
    "filter": "blur(5px)",
    "-webkit-filter": "blur(5px)"
  });
}

function fadeOut(oldID, newID) {
  $(oldID).fadeOut(1000, function() {
    $(newID).fadeIn(1000);
    location.href = newID;
    $("html, body").animate({
    scrollTop: $(newID).offset().top
    }, 1000);
  });
}

function refillData(form) {
  switch (form) {
    //Names
    case "#form-1":
      if (names.length >= 0) {
        for (var i = 0; i < names.length; i++) {
          var name = "#name-" + [i+1];
          var mail = "#mail-" + [i+1];
          $(name).val(names[i].name);
          $(mail).val(names[i].mail);
        }
      } else {
        $("#name-1, #name-2, #name-3, #mail-1, #mail-2, #mail-3").val("");
      }    
     break;
    //Date
    case "#form-2":
      if (mailtxt.date) {
        $("#date").val(mailtxt.date);
      } else {
        $("#date").val("");
      }
      break;
    //Amount
    case "#form-3":
      if (mailtxt.amount) {
        $("#amount").val(mailtxt.amount);
        $("#currency").val(mailtxt.currency[0]);
      } else {
        $("#amount").val("");
        $("#currency").val("EUR");
      }
      break;
    //Text
    case "#form-4":
      if (mailtxt.message) {
        $("#text").val(mailtxt.message);
      } else {
        $("#text").val("");
      }
      break;
  }
}

function goBack(oldID, newID){
  
  fadeOut(oldID, newID);

  setTimeout(function() { refillData(newID) },500);
}

function startForm(id) {
  var el = document.getElementById(id);
  el.style.display = (el.style.display != 'none' ? 'none' : '' );
  el.style.background = 'transparent';
  id = "#" + id;
  location.href = id;
  $("html, body").animate({
    scrollTop: $(id).offset().top
  }, 1000);
  blurIt();

  //Empty Value Fields cause fucking Firefox keeps them!
  $("#name-1, #name-2, #name-3, #mail-1, #mail-2, #mail-3").val("");
}

function closeForm(id) {
  if (confirm("Are you sure you wanna cancel?") == true ) {
    var el = document.getElementById(id);
    el.style.display = 'none';
    document.getElementById("nav").style.display = '';
    location.href = "file://localhost/Users/aileennowak/Sites/secretsanta/index.html";
    window.scrollTo(0, document.getElementById('#top'));  
    $("#learnmore, #nav, footer, header, #clock, .btn-down").css({
      "filter": "blur(0)",
      "-webkit-filter": "blur(0)"
    });                      
  }
}

function addPerson(id) {
  var i = document.getElementById(id).parentNode.getElementsByTagName("P").length;
  var btn = document.getElementById("add-user");

  function duplicate() {

    var p = document.createElement("P");
    $(p).attr({
      class: "row",
      id: "user-" + ++i
    });

    var lblName = document.createElement("LABEL");
    $(lblName).attr({
      id: "name-lbl-" + i,
      name: "name-" + i,
      class: "addedUser"
    });
    $(lblName).text("Name: ");
    p.appendChild(lblName);

    var inpName = document.createElement("INPUT");
    $(inpName).attr({
      type: "text",
      id: "name-" + i,
      class: "form-control addedUser",
      placeholder: "Name",
      required: true
    });
    p.appendChild(inpName);

    var lblMail = document.createElement("LABEL");
    $(lblMail).attr({
      id: "mail-lbl-" + i,
      name: "mail-" + i,
      class: "addedUser"
    });
    $(lblMail).text("Email: ");
    p.appendChild(lblMail);

    var inpMail = document.createElement("INPUT");
    $(inpMail).attr({
      type: "text",
      id: "mail-" + i,
      class: "form-control addedUser",
      placeholder: "Email",  
      required: true
    });
    p.appendChild(inpMail);

    var delUser = document.createElement("IMG")
    $(delUser).attr({
      id: "delete-user" + i,
      src: "icons/circle_delete_white.png",
      class: "user-delete",
      onclick: "deletePerson(this)",
      onmouseover: "hover(this, 'icons/circle_delete_red.png')",
      onmouseout: "unhover(this, 'icons/circle_delete_white.png')",
      alt: "Remove Person",
      "data-toggle": "tooltip",
      title: "Remove this Person"
    })
    p.appendChild(delUser);

    document.getElementById("user-1").parentNode.insertBefore(p, btn);
  }
  duplicate();
}

function deletePerson(e) {
  var el = $(e).parent();
  if (confirm("Wanna remove this Secret Santa User?")) {
    $(el).remove();
  }
}

function hover(element, img) {
  element.setAttribute('src', img);
}

function unhover(element, img) {
  element.setAttribute('src', img);
}


//submitNames validates the input fields in #form-1 and fills the names array
//then in opens the next form to submit the date (#form-2)
function submitNames(oldID, newID) {

  //vars for error tag if needed
  var flds = document.getElementById("name-fieldset");
  var btn = document.getElementById("add-user");
  var pmsg = document.createElement("P");
  pmsg.className = "error-message";

  //Remove error message
  $('.error-message').remove();

  var inp = document.getElementById("form-1").getElementsByTagName("INPUT");
  var nId, mId;
  var x = 0;

  function checkName(name) {
    //Check if Name is filled
    if (name.value === "") {
      $(name).addClass("error-input");
    } else {
      $(name).removeClass("error-input");
    }
  }

  function checkMail(mail) {
    //better email validation to come (regex)
    var check = mail.value.indexOf("@");

    if (mail.value === "") {
      $(mail).addClass("error-input");
    } else {
      if (check === -1) {
        $(mail).addClass("error-input");
      } else if (mail.value.indexOf(".", check) === -1) {
          $(mail).addClass("error-input");
      } else {
        $(mail).removeClass("error-input");
      }
    }
  }

  //Stay in same id for 2 times (first 'name-1' then 'mail-1')
  //first index i for input fields
  for (var i = 1; i <= inp.length / 2; i++) {
    // console.log(inp[x]);
    nId = "name-" + (i);
    mId = "mail-" + (i);
    //But now go through values for each in array
    //use second index x
    for (x; x < inp.length; x++) {

      if (inp[x].id === nId) {
        checkName(inp[x])
      } else if (inp[x].id === mId) {
        checkMail(inp[x])
      } else {
        break;
      }
    }
  }

  //check, if all fields are without error and fill names array
  if (document.getElementsByClassName("error-input").length === 0) {
    if (names.length > 0) {
      names = [];
    }
    //filling the names array which will be globally used to mix the santas later
    for (var j = 0; j < inp.length; j+=2) {
        names.push({
          id: (j+2)/2,
          name: inp[j].value,
          mail: inp[j+1].value
        });
    }

    console.log(names);

    //check if array names is filled properly and move on to the next step
    if (names.length >= 3) {

        fadeOut(oldID, newID);

        setTimeout(function() { refillData(newID)}, 500);

    } else {
      pmsg.innerHTML = "Oops... At least you need three fellas to play secret santa!";
      flds.insertBefore(pmsg, btn);
      $(".error-input").focus();
    }
  } else {
    if (names.length > 0 && names.length <= 3) {
      pmsg.innerHTML = "Oops, something is not right, right?";
      flds.insertBefore(pmsg, btn);
      $(".error-input").focus();
    } else {
      pmsg.innerHTML = "Oops, something is not right, right?";
      flds.insertBefore(pmsg, btn);
      $(".error-input").focus();
    }
  }
}



function submitDate(oldID, newID) {

  //vars for error tag if needed
  var flds = document.getElementById("date-fieldset");
  var p = document.getElementById("date-fieldset").getElementsByTagName("p");
  var pmsg = document.createElement("P");
  pmsg.className = "error-message";

  //remove error-messages
  $(".error-message").remove();

  var date = document.getElementById('date').value;

  function isValidDate(dateString) {

    var parts = [];
    var day, month, year, mmddyyyy, ddmmyyyy, yyyymmdd;

    // First check for the pattern
    function getDateFormat(dateString) {
      mmddyyyy = false; 
      ddmmyyyy = false;
      yyyymmdd = false;
      mmddyyyy = /^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/.test(dateString);
      ddmmyyyy = /^(0?[1-9]|[12][0-9]|3[01])[- /.](0?[1-9]|1[012])[- /.](19|20)\d\d$/.test(dateString);
      yyyymmdd = /^(19|20)\d\d[-/.}](0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])$/.test(dateString);
    }

    getDateFormat(dateString);

    parts = dateString.split(/\D/);

    if (mmddyyyy || ddmmyyyy || yyyymmdd) {
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].length < 2) {
          parts[i] = "0" + parts[i];
        }
      }
      dateString = parts.join("/");
      getDateFormat(dateString);
    } else {
      return false;
    }

    if (mmddyyyy) {
     // Parse the date parts to integers
      day = parseInt(parts[1], 10);
      month = parseInt(parts[0], 10);
      year = parseInt(parts[2], 10);
    }

    if (ddmmyyyy) {
     // Parse the date parts to integers
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    }

    if (yyyymmdd) {
     // Parse the date parts to integers
      day = parseInt(parts[2], 10);
      month = parseInt(parts[1], 10);
      year = parseInt(parts[0], 10);
    }
   

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  }  

  //Check first if Date is filled and a correct date
  if (isValidDate(date)) {
    //Now check if it is in the past
    if (Date.parse(date) - Date.parse(new Date()) < 0){
      $("#date").addClass("error-input");
      pmsg.innerHTML = "Date is in the past. Would be better to have it in the future, don't you think?";
      p[0].appendChild(pmsg);
      $("#date").focus();
      return;
    } else {
      mailtxt.date = date;
      $("#date").removeClass("error-input");

      console.log(mailtxt);

      fadeOut(oldID, newID);
    }

  } else {
    $("#date").addClass("error-input");
    pmsg.innerHTML = "Please make it a date! Like dd/mm/yyy... That should work!";
    p[0].appendChild(pmsg);
    $("#date").focus();
  }
  setTimeout(function() {refillData(newID)}, 500);
}

function submitAmount(oldID, newID) {

  //vars for error message
  var el = document.getElementsByClassName("amount-input");
  var pmsg = document.createElement("P");
  pmsg.className = "error-message";

  //remove error-messages
  $(".error-message").remove();

  var val = document.getElementById('amount').value;
  //Check if amount is filled and a number
  if (val === "" || parseInt(val) === NaN) {
    pmsg.innerHTML = "It's all about the money, money, money... Please give us a price!";
    el[0].appendChild(pmsg);
    $("#amount").addClass("error-input");
    $("#amount").focus();
    return;
  } else {
    mailtxt.amount = parseInt(val);
    mailtxt.currency = [];
    mailtxt.currency[0] = $("#currency option:selected").val();
    mailtxt.currency[1] = $("#currency option:selected").text();

    console.log(mailtxt);

    $("#amount").removeClass("error-input");

    fadeOut(oldID, newID);
  }

  setTimeout(function() { refillData(newID)}, 500);
}

function submitMessage(oldID, newID) {
  var val = document.getElementById("text").value;

  mailtxt.message = val;

  fadeOut(oldID, newID);

  fillReview();
}

function fillReview() {

  //Fill the names and mails from array
  var ol = document.getElementById("names-review");
  if (names.length > 0) {
    for (var i = 0; i < names.length; i++) {
      var li = document.createElement("LI");
      li.innerHTML = names[i].name + ", " + names[i].mail;
      ol.appendChild(li);
    }
  } else {
    ol.innerHTML = "No Secret Santas yet!";
  }

  //Fill the date
  var date = document.getElementById("date-review");
  if (mailtxt.date) {
    date.innerHTML = mailtxt.date;
  } else {
    date.innerHTML = "No date chosen!";
  }

  //Fill the amount
  var amount = document.getElementById("amount-review");
  if (mailtxt.amount && mailtxt.currency) {
    amount.innerHTML = mailtxt.amount + " " + mailtxt.currency[1];
  } else {
    amount.innerHTML = "No amount chosen yet!";
  }

  //Fill message
  var msg = document.getElementById("message-review");
  if (mailtxt.message) {
    $("#message-review-form").show();
    msg.innerHTML = mailtxt.message;
  } else {
    $("#message-review-form").hide();
  }

}
function mixSantas() {
  // var names = [
  // {
  //   id: 1,
  //   name: "Aileen", 
  //   mail: "aileencgn@gmail.com"
  //   },
  // {
  //   id: 2,
  //   name: "Jana", 
  //   mail: "jana.kawecki@googlemail.com"
  // },
  // {
  //   id: 3,
  //   name: "Mia", 
  //   mail: "mia.ayoub@gmail.com"
  // },
  // { 
  //   id: 4,
  //   name: "Mohammed", 
  //   mail: "mohd.gouda87@gmail.com"
  // }];
   // ["René", "Renozeros@gmail.com"], ["Vanni", "vanjaceric@hotmail.com"],
   //           ["John", "john@onolan.org"], 
   //           ["Hoda", "Hodamans@hotmail.com"], ["Jeroen", "Jeroenelmasry@gmail.com"], 
   //           ["Nico", "nico@redseacat.com"], ["Marwa", "marwa_mia@yahoo.com"], ["Nicola", "nicola-chan@gmx.de"],
   //           ["André", "andre.honerbach@gmx.de"]];


  var happyKid = names.slice();
  console.log(names[0].name);

  console.log("There are " + names.length + " participans!")

  for (var i = 0; i < names.length; i++) {

    console.log("Looking at number: " + i + ", which is " + names[i].name);  

    //find a random number, which is smaller than the happyKid array, so only look within
    //the leftofer kids

    var random = Math.floor((Math.random() * happyKid.length-1) + 1);

    console.log("Random number selected: " + random + ", which is " + happyKid[random].name);

    //In Case Santa and happyKid are the same person, add or substract one to/from the selected 
    //random number.
    if (names[i] === happyKid[random]) {
      //Substract one, in case the random number is already the last array value
      if (random === happyKid.length-1) {
        alert("new random number")
        alert(random + happyKid.length-1);
        random--;
        if (random < 0) {
          mixSantas();
        }
      //Add one, if it's not the last value
      } else {
      random++;
      }
    }

    //spread the word!
    console.log("Dear " + names[i].name + ", your secret santa is: " + happyKid[random].name);
    names[i].santa = happyKid[random].name;
    //remove the matched secret santa
    happyKid.splice(random, 1);
    console.log("Rest: " + happyKid.length);
  }  
  console.log(names);

  createJSON(names);
}

function createJSON(names) {

var Mailgun = require('mailgun').Mailgun;

var mg = new Mailgun('key-d15d303730931149577eda7ef634aa36');
mg.sendText('example@example.com', ['Recipient 1 <rec1@example.com>', 'rec2@example.com'],
  'This is the subject',
  'This is the text',
  'noreply@example.com', {},
  function(err) {
    if (err) console.log('Oh noes: ' + err);
    else     console.log('Success');
});

  
// https://api.mailgun.net/v3/sandboxcf31e03b7f0846099cd91f48fdf9b01d.mailgun.org/validate?callback=?

// $.ajax({
//     type     : 'POST',
//     cache    : false,
//     url      : "https://api.mailgun.net/v3/sandboxcf31e03b7f0846099cd91f48fdf9b01d.mailgun.org/messages",
//     beforeSend: function (request) {
//                 request.setRequestHeader({
//                     'authorization': "Basic YXBpOmtleS1kMTVkMzAzNzMwOTMxMTQ5NTc3ZWRhN2VmNjM0YWEzNg==",
//                     'access-control-allow-origin': "*",
//                     'access-control-allow-headers': "Origin, X-Requested-With, Content-Type, Accept, Max-Age",
//                     'Access-Control-Max-Age': "600",
//                     'Access-Control-Request-Method': 'POST',
//                     'cache-control': "no-cache"});},
//     data: {
//       from: "aileennowak@me.com",
//       to: "secretsanta@sandboxcf31e03b7f0846099cd91f48fdf9b01d.mailgun.org",
//       subject: "test",
//       text: "this is a test"
//       // user: "api",
//       // password: "key-d15d303730931149577eda7ef634aa36"
//     },
//     success  : function(data) {
//       console.log(data);
//     },
//     error  : function(data) {
//       console.log('Silent failure.');
//     }
//   });

// $.ajax({
//   type: “POST”,
//   url: “https://mandrillapp.com/api/1.0/messages/send.json”,
//   data: {
//     ‘key’: ‘ZJyWQ8_WtFxq1UqGYNroCQ’,
//     ‘message’: {
//       ‘from_email’: ‘AileenCGN@gmail.com’,
//       ‘to’: [
//           {
//             ‘email’: ‘aileennowak@me.com’,
//             ‘name’: ‘Aileen’,
//             ‘type’: ‘to’
//           }
//         ],
//       ‘autotext’: ‘true’,
//       ‘subject’: ‘Your Secret Santa’,
//       ‘html’: ‘YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!’
//     }
//   }
//  }).done(function(response) {
//    console.log(response); // if you're into that sorta thing
//  });


// $.ajax({

//   url: "https://api.mailgun.net/v3/sandboxcf31e03b7f0846099cd91f48fdf9b01d.mailgun.org/messages",
//   crossDomain: true,
//   async: true,
//   method: "POST",
//   dataType: "json",
//   // connection: "keep-alive",
//   username: "api",
//   password: "key-d15d303730931149577eda7ef634aa36",
//   'content-type': "text/html; charset=utf-8",
//   headers: {
//     // authorization: "Basic YXBpOmtleS1kMTVkMzAzNzMwOTMxMTQ5NTc3ZWRhN2VmNjM0YWEzNg=="
//     // 'access-control-allow-origin': "*",
//     // 'access-control-allow-headers': "X-Requested-With, Content-Type"
//     // 'cache-control': "no-cache",
//   },
//   data: {
//     from: "aileennowak@me.com",
//     to: "secretsanta@sandboxcf31e03b7f0846099cd91f48fdf9b01d.mailgun.org",
//     subject: "test",
//     text: "this is a test"
//     // user: "api",
//     // password: "key-d15d303730931149577eda7ef634aa36"
//   },
//   success: function(response) {
//     alert("success");
//   },
//   error: function(response) {
//     alert("error");
//   },
//   done: function(response) {
//     console.log(response);
//   } 
// });

// console.log(settings);

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });

// $.ajax({
//   headers: {
//     "Authorization": "Basic YXBpOmtleS1kMTVkMzAzNzMwOTMxMTQ5NTc3ZWRhN2VmNjM0YWEzNg==",
//     "Access-Control-Allow-Headers": "Authorization"
//   },
//   url: "http://bin.mailgun.net/30b72aec",
//   // url: "https://api.mailgun.net/v3/sandboxcf31e03b7f0846099cd91f48fdf9b01d.mailgun.org/messages",
//   type: "POST",
//   dataType: 'json',
//   username: 'api',
//   password: 'key-d15d303730931149577eda7ef634aa36',
//   data: {
//     from: "aileennowak@me.com",
//     to: "secretsanta@sandboxcf31e03b7f0846099cd91f48fdf9b01d.mailgun.org",
//     subject: "test",
//     text: "this is a test",
//     html: "<html>html version of the text</html>"
//   },
//   // cache: false,
//   success: function() {
//       alert('ok');
//   },
//   error: function() {
//       alert('problems');
//   }
// });

// var settings = {
//   "async": false,
//   "crossDomain": true,
//   "url": "https://api.mailgun.net/v3/sandboxcf31e03b7f0846099cd91f48fdf9b01d.mailgun.org/messages",

//   "method": "POST",
//   "headers": {
//     "authorization": "Basic YXBpOmtleS1kMTVkMzAzNzMwOTMxMTQ5NTc3ZWRhN2VmNjM0YWEzNg==",
//     "Access-Control-Allow-Headers": "Authorization"
//     // "access-control-allow-origin": "*",
//     // "access-control-allow-headers": "Origin, X-Requested-With, Content-Type, Accept",
//     // "cache-control": "no-cache",
//     // "postman-token": "801b73c1-a62c-8ec0-0437-00e8d4d9cb7d",
//     // "content-type": "application/x-www-form-urlencoded"
//   },
//   "data": {
//     "from": "aileennowak@me.com",
//     "to": "secretsanta@sandboxcf31e03b7f0846099cd91f48fdf9b01d.mailgun.org",
//     "subject": "test",
//     "text": "this is a test",
//     "user": "api",
//     "password": "key-d15d303730931149577eda7ef634aa36"
//   }
// };


  // settings.data.to = names[0].mail;
  // settings.data.text = "Ho Ho Ho! You are chosen to be part of an awesome fun game which bring joy and happiness to everyone: Secret Santa! " +
  //                      "Our magical procedure a person for you, whom you have to buy a gift: " + names[0].santa + ". Make sure to stay in the " +
  //                      "budget of " + mailtxt.amount + " " + mailtxt.currency[1] + "." +
  //                      "The gifts will be exchanged on the " + mailtxt.date + "." + "Merry christmas!";
  // settings.data.html = "<html>html version of the text</html>";
  // console.log(settings);

  // // $.ajax(settings).beforeSend(function (response) {
  // // console.log(response);
  // // });
  // $.ajax(settings).done(function (response) {
  // console.log(response);
  // });
}