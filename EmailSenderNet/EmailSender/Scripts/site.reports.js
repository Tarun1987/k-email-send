(() => {

    $(document).ready(function () {
        const previewSelector = '[data-preview]';

        $(previewSelector).on('click', function () {
            var elem = $(this);
            var id = elem.attr('data-id');
            getTemplateById(id, function (data) {
                var win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top=" + (screen.height - 400) + ",left=" + (screen.width - 840));
                win.document.body.innerHTML = data.Html;
            });
        });
    });

    function getTemplateById(id, callback) {
        $.get('/Report/GetHistoryById', { id }, function (data, status, jqXHR) {
            callback(data);
        })
    }

})();