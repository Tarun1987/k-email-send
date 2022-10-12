$(document).ready(function () {
    const selector = '[data-preview]';

    $(selector).on('click', function () {
        var elem = $(this);
        var id = elem.attr('data-id');
        previewHtml(id);
       
    });
});


function previewHtml(id, cb) {
    $.get('/Template/GetTemplateById', { id }, function (data, status, jqXHR) {
        var win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top=" + (screen.height - 400) + ",left=" + (screen.width - 840));
        win.document.body.innerHTML = data.Html;
    })
}
