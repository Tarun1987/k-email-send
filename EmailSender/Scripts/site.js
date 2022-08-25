let intervalId = 0;
$(document).ready(function () {
    const modalId = '#myModal'
    const textEditorId = '#email-body';
    // Initialize Editor
    $(textEditorId).summernote({
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

    $('.form-control-file').on('change', function () {
        let $fileElem = $('[data-control-id=' + this.id + ']');
        let msg = 'No File Selected'
        if ($(this).val()) {
            msg = $(this).val().replace(/C:\\fakepath\\/i, '');
        }
        if ($fileElem) $fileElem.html(msg);
    });

    $('#selectTemplate').on('change', function () {
        var elem = $(this);
        $(textEditorId).summernote('reset');
        $(textEditorId).summernote('pasteHTML', getEditorTemplateString(elem.val()));
    });
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

function getEditorTemplateString(templateId) {
    if (templateId === "basic") {
        return "<p>This is from <strong>Basic Template.</strong></p>";
    }
    else if (templateId === "custom") {
        return "<p>This is from <strong>Custom Template.</strong></p>"
    }
    else {
        return "<i>No template found.</i>"
    }
}