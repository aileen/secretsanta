// function mixSantas() {
//   var names = [
//   {
//     id: 1,
//     name: "Aileen", 
//     mail: "aileencgn@gmail.com"
//     },
//   {
//     id: 2,
//     name: "Jana", 
//     mail: "jana.kawecki@googlemail.com"
//   },
//   {
//     id: 3,
//     name: "Mia", 
//     mail: "mia.ayoub@gmail.com"
//   },
//   { 
//     id: 4,
//     name: "Mohammed", 
//     mail: "mohd.gouda87@gmail.com"
//   }];
//    // ["René", "Renozeros@gmail.com"], ["Vanni", "vanjaceric@hotmail.com"],
//    //           ["John", "john@onolan.org"], 
//    //           ["Hoda", "Hodamans@hotmail.com"], ["Jeroen", "Jeroenelmasry@gmail.com"], 
//    //           ["Nico", "nico@redseacat.com"], ["Marwa", "marwa_mia@yahoo.com"], ["Nicola", "nicola-chan@gmx.de"],
//    //           ["André", "andre.honerbach@gmx.de"]];


//   var happyKid = names.slice();
//   console.log(names[0].name);

//   console.log("There are " + names.length + " participans!")

//   for (var i = 0; i < names.length; i++) {

//     console.log("Looking at number: " + i + ", which is " + names[i].name);  

//     //find a random number, which is smaller than the happyKid array, so only look within
//     //the leftofer kids

//     var random = Math.floor((Math.random() * happyKid.length-1) + 1);

//     console.log("Random number selected: " + random + ", which is " + happyKid[random].name);

//     //In Case Santa and happyKid are the same person, add or substract one to/from the selected 
//     //random number.
//     if (names[i] === happyKid[random]) {
//       //Substract one, in case the random number is already the last array value
//       if (random === happyKid.length-1) {
//         alert("new random number")
//         alert(random + happyKid.length-1);
//         random--;
//         if (random < 0) {
//           mixSantas();
//         }
//       //Add one, if it's not the last value
//       } else {
//       random++;
//       }
//     }

//     //spread the word!
//     console.log("Dear " + names[i].name + ", your secret santa is: " + happyKid[random].name);
//     names[i].santa = happyKid[random].name;
//     //remove the matched secret santa
//     happyKid.splice(random, 1);
//     console.log("Rest: " + happyKid.length);
//   }  
//   console.log(names);

//   createJSON();
// }

// function createJSON() {
//   var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://api.mailgun.net/v3/sandboxcf31e03b7f0846099cd91f48fdf9b01d.mailgun.org/messages",
//     "method": "POST",
//     "headers": {
//       "authorization": "Basic YXBpOmtleS1kMTVkMzAzNzMwOTMxMTQ5NTc3ZWRhN2VmNjM0YWEzNg==",
//       "cache-control": "no-cache",
//       "postman-token": "83519507-1722-659c-5765-475a5cb7f443",
//       "content-type": "application/x-www-form-urlencoded"
//     },
//     "data": {
//       "from": "aileennowak@me.com",
//       "to": "secretsanta@sandboxcf31e03b7f0846099cd91f48fdf9b01d.mailgun.org",
//       "subject": "Your Secret Santa",
//       "text": "this is a test",
//       "html": "here comes the html version of the message"
//     }
//   }

//   settings.data.to = names[0].mail;
//   settings.data.text = "bla bla";
//   settings.data.html = "<html>html version of the text</html>";
//   console.log(settings);
// }