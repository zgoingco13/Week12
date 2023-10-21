const OUTFIT_URL = 'http://localhost:3000/outfits'

$.get(OUTFIT_URL).then(data => { //map over the data and returned table row elements referencing object off the outfit and appended tr to the tbody//
    data.map(outfit => {
        $('tbody').append(
            $(`
            <tr>
                <td>${outfit.id}</td>
                <td>${outfit.topClothing}</td>
                <td>${outfit.bottomClothing}</td>
                <td>
                    <button onclick="deleteOutfit(${outfit.id})">🗑</button> 
                </td>
            </tr>
            `) //outfit.id is the unique outfit id passed in
        )
    })
})

$('#submitOutfit').click(function() {
    $.post(OUTFIT_URL, {//this is what will get posted to endpoint
        topClothing: $('#topClothing').val(), //$(input node) and .val grabs the value
        bottomClothing: $('#bottomClothing').val(),
    })
})

function deleteOutfit(id) {
    $.ajax(`${OUTFIT_URL}/${id}`, { //${OUTFIT_URL}/{id} targets specific id within the url//
        type: 'DELETE'
    })
}

function updateOutfit() {
    let id = $('#updateOutfitId').val() //new id for updates

    $.ajax(`${OUTFIT_URL}/${id}`, {
        method:'PUT',
        data: {
            topClothing: $('#updateTopClothing').val(),
            bottomClothing: $('#updateBottomClothing').val(),
        }
    })
}

$('#updateOutfit').click(updateOutfit)