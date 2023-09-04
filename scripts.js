//function to add cardlist to html
const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">' +
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.path + '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="#">' + item.link + '</a></p></div>' +
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.title + '<i class="material-icons right">close</i></span>' +
            '<p class="card-text">' + item.desciption + '</p>' +
            '</div></div></div>';
        $("#card-section").append(itemToAppend);
    });
}

const formSubmitted = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.subTitle = $('#subTitle').val();
    formData.path = $('#path').val();
    formData.description = $('#description').val();

    console.log(formData);
    postCat(formData);
}


function postCat(cat) {
    $.ajax({
        url: '/api/cat',
        type: 'POST',
        data: cat,
        success: (result) => {
            if (result.statuscode === 201) {
                alert('cat post successful');
            }
        }
    })
}

function getAllCats() {
    $.get('/api/cat', (response) => {
        if (response.statuscode === 200) {
            addCards(response.data);
        }
    });
}

let socket = io();
socket.on('number',(message)=>{
    console.log('The number is: ' + message);
});

$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        formSubmitted();
    });
    $('.modal').modal();
    getAllCats();

});