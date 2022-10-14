let intervalId = 0;
$(document).ready(function () {
    const modalId = '#myModal'
    const textEditorId = '#email-body';
    const logDataId = '#log-data';
    const emailSectionId = '#emailtext';
    const recipientsBxPanel = '#recipients-box-panel';
    const masterRecipientsUpdate = '#MasterRecipients';


    // Initialize Editor
    $(textEditorId).summernote({
        height: 300, // set editor height
        minHeight: null, // set minimum height of editor
        maxHeight: null, // set maximum height of editor
    });


    // var elemLogData = $(logDataId);
    //if (elemLogData && elemLogData.attr("data-log-file-name")) {
    //    intervalId = setInterval(function () {
    //        getEmailSendProgress(elemLogData.attr("data-log-file-name"), elemLogData.attr("data-recipient-count"));
    //    }, 3000)
    //}

    $('.form-control-file').on('change', function () {
        let $fileElem = $('[data-control-id=' + this.id + ']');
        let msg = 'No File Selected'
        if ($(this).val()) {
            msg = $(this).val().replace(/C:\\fakepath\\/i, '');
            if ($(this).attr('id') === "RecipientFile") {
                $(emailSectionId).collapse('show');
            }
        }
        if ($fileElem) $fileElem.html(msg);
    });

    $('#selectTemplate').on('change', function () {
        var elem = $(this);
        $(textEditorId).summernote('reset');
        getEditorTemplateString(elem.val(), function (htmlStr) {
            $(textEditorId).summernote('pasteHTML', htmlStr);
        });
    });

    $('#UseDefaultTemplate').change(function () {
        var checked = $(this).prop('checked');
        if (checked) {
            $('#new-file-container').hide();
            $(emailSectionId).collapse('show');
            $(recipientsBxPanel).addClass('no-upload')
        }
        else {
            $('#new-file-container').show();
            $(emailSectionId).collapse('hide');
            $(recipientsBxPanel).removeClass('no-upload')
        }
    })

    $(masterRecipientsUpdate).on('change', function () {
        if ($(this).val()) {
            $('#upload-master-container').hide();
            $('#upload-master-cancel').show();
        }
        else {
            $('#upload-master-container').show();
            $('#upload-master-cancel').hide();
        }
    });

    $('#btn-master-cancel').on('click', function () {
        $('#upload-master-container').show();
        $('#upload-master-cancel').hide();
    })

    $('#btnSubmit').on('click', function () {
        $(modalId).modal({
            backdrop: 'static'
        });

        $(modalId + " .modal-close").on('click', function () {
            $(modalId).modal('hide')
        })

        $('#btn-send').on('click', function () {
            $('#modal-body-2').hide();
            $('#modal-body-1').show();
            $('#modal-footer-1').hide();
            let percent = 0;
            setInterval(function () {
                percent += 10;
                $('#send-progress').attr('aria-valuenow', percent);
                $('#send-progress').css('width', percent + '%');

                if (percent >= 100) {
                    $('#modal-footer-2').show();
                    $('#progress-text').html('Email sending completed...');
                    sendEmail();
                }
            }, 1000);
        });
    })

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

function getEditorTemplateString(templateName, cb) {
    $.post('/home/GetExitorTemplate', { templateName }, function (data, status, jqXHR) {
        cb(data.htmlString);
    })
}


function sendEmail() {
    var Subject = $('#Subject').val();
    var Greeting = $('#Greeting').val();
    var Body = $('#Body').val();

    $.post("/home/sendEmail", { Subject, Greeting, Body }, function (data, status, jqXHR) {

    });
}