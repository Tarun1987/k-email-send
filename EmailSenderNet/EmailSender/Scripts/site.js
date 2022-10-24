
const textEditorId = '#email-body';
$(document).ready(function () {

    // Initialize Editor
    $(textEditorId).summernote({
        height: 300, // set editor height
        minHeight: null, // set minimum height of editor
        maxHeight: null, // set maximum height of editor
    });

    $('.form-control-file').on('change', function () {
        let $fileElem = $('[data-control-id=' + this.id + ']');
        let msg = 'No File Selected'
        if ($(this).val()) {
            msg = $(this).val().replace(/C:\\fakepath\\/i, '');
        }
        if ($fileElem) $fileElem.html(msg);
    });

});
