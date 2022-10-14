$(document).ready(function () {
    const selector = '[data-preview]';
    const shareCheckSelector = 'data-share-check';

    $(selector).on('click', function () {
        var elem = $(this);
        var id = elem.attr('data-id');
        previewHtml(id);

    });

    $(`[${shareCheckSelector}]`).on('change', function () {
        var elem = $(this);
        var value = elem.is(':checked');
        var id = elem.attr(shareCheckSelector);

        $.post("/Template/UpdateShareStatus", { share: value, id }, function (result, status, jqXHR) {
            if (result === "OK") {
                alert('Success');
            }
            else {
                alert('Failed');
            }
        })
    });

});


function previewHtml(id, cb) {
    $.get('/Template/GetTemplateById', { id }, function (data, status, jqXHR) {
        var win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top=" + (screen.height - 400) + ",left=" + (screen.width - 840));
        win.document.body.innerHTML = data.Html;
    })
}
