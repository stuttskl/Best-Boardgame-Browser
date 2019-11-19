console.log('client.js connectioned')

function deletePlayer(id){
    console.log("inside deletePlayer function")
    $.ajax({
        url: '/players_delete/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

// document.addEventListener('DOMContentLoaded', bindButtons);

// function bindButtons() {
//   document.getElementById("player-delete-btn").addEventListener("click", function() {
//     console.log('delete clicked')
//     deleteEvent(event);
//   })





//   function deleteEvent(event) {
//   var req = new XMLHttpRequest();
//   // var id = this.value;
//   var payload = {id:null};
//   payload.id = this.value;
//   req.open('GET', '/player_delete', true);
//   req.setRequestHeader('Content-Type','application/json');
//   req.addEventListener('load',function() {
//       if(req.status >= 200 && req.status < 400) {
//         // res.render('players')
//         // console.log(JSON.parse(req.responseText));
//       } else {
//           console.log('Error in network request: ' + req.statusText);
//       }
//   });
//   req.send(JSON.stringify(payload));
//   event.preventDefault();
// }

// }




