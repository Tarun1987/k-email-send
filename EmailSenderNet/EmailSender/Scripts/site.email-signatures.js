(() => {

    const fieldNameSelector = '#Name';
    const fieldIdSelector = '#SignatureId';

    $(document).ready(function () {
        const previewSelector = '[data-preview]';
        const editSelector = '[data-edit]';
        const shareCheckSelector = 'data-share-check';
        const btnAddNewSelector = '#btnAddNew';
        const btnCancelSelector = '#btnCancel';

        $(previewSelector).on('click', function () {
            var elem = $(this);
            var id = elem.attr('data-id');
            getById(id, function (data) {
                var win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top=" + (screen.height - 400) + ",left=" + (screen.width - 840));
                win.document.body.innerHTML = data.Html;
            });
        });

        $(editSelector).on('click', function () {
            var elem = $(this);
            var id = elem.attr('data-id');
            resetFields();
            getById(id, function (data) {
                $('.collapse').collapse('show');
                $(fieldNameSelector).val(data.Name);
                $(fieldIdSelector).val(data.Id);
                $(textEditorId).summernote('pasteHTML', data.Html);
                $(btnAddNewSelector).hide();
            });
        });

        $(`[${shareCheckSelector}]`).on('change', function () {
            var elem = $(this);
            var value = elem.is(':checked');
            var id = elem.attr(shareCheckSelector);
            updateShareStatus(value, id);
        });

        $(btnAddNewSelector).click(function () { $(this).hide() })
        $(btnCancelSelector).click(function () {
            $(btnAddNewSelector).show();
            resetFields();
        })
    });

    function updateShareStatus(value, id) {
        $.post("/Signature/UpdateShareStatus", { share: value, id }, function (result, status, jqXHR) {
            if (result === "OK") {
                alert('Success');
            }
            else {
                alert('Failed');
            }
        })
    }

    function getById(id, callback) {
        $.get('/Signature/GetSignatureById', { id }, function (data, status, jqXHR) {
            callback(data);
        })
    }

    function resetFields() {
        $(fieldNameSelector).val('');
        $(textEditorId).summernote('reset');
        $(fieldIdSelector).val('0')
    }

})();