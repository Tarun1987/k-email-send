let intervalId = 0;
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

    var elemLogData = $('#log-data');
    if (elemLogData) {
        intervalId = setInterval(function () {
            getEmailSendProgress(elemLogData.attr("data-log-file-name"), elemLogData.attr("data-recipient-count"));
        }, 3000)
    }
});


function getEmailSendProgress(logFileName, totalRecipientsCount) {
    $.post('/home/GetProgress', { fileName: logFileName }, function (data, status, jqXHR) {
        var percent = (parseInt(data.completed) / parseInt(totalRecipientsCount) * 100);
        $('#send-progress').attr('aria-valuenow', percent);
        $('#send-progress').css('width', percent + '%');

        if (percent >= 100) {
            $('#btn-close').show();
            $('#progress-text').html('Email sending completed...');
            clearInterval(intervalId);
        }
    })
}