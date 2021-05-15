function deleteAlbanian(AlbanianId) {
    $.ajax({
        url: '/Albanian/' + AlbanianId + '/delete-json',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({ AlbanianId }),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log("Result: ", res)
            $("#" + AlbanianId).remove();
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
} 