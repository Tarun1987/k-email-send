$(document).ready(function () {
    const modalId = '#myModal'
    // Initialize Editor
    $('.textarea-editor').summernote({
        height: 300, // set editor height
        minHeight: null, // set minimum height of editor
        maxHeight: null, // set maximum height of editor
    });

    $(modalId).modal({
        backdrop: 'static'
    });

    $(modalId + " .modal-close").on('click', function () {
        $('#myModal').modal('hide')
    })
});