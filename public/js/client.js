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