(() => {

    let intervalId = 0;
    const formIdSelector = "#frmManageEmail";
    const textEditorId = '#email-body';
    $(document).ready(function () {
        const modalId = '#myModal'
        const logDataId = '#log-data';
        const btnSubmit = "#btnSubmit";
        const ddTemplateIdSelector = "#TemplateId";
        const ddRecipientNameSelector = "#RecipientTemplateName";
        const ddRecipientListSelector = "#recipientListHtml";


        // Initialize Editor
        $(textEditorId).summernote({
            height: 300, // set editor height
            minHeight: null, // set minimum height of editor
            maxHeight: null, // set maximum height of editor
        });


        var elemLogData = $(logDataId);
        if (elemLogData && elemLogData.attr("data-log-file-name")) {
            $(modalId).modal({ backdrop: 'static' });
            $(modalId + " .modal-close").on('click', function () {
                $(modalId).modal('hide');
                window.location.href = window.location.href;
            })
            $('#totalToSendCounText').html(elemLogData.attr("data-recipient-count"))
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

        $(ddTemplateIdSelector).on('change', function () {
            var elem = $(this);
            $(textEditorId).summernote('reset');
            getEditorTemplate(elem.val(), function (htmlStr) {
                $(textEditorId).summernote('pasteHTML', htmlStr);
            });
        });

        $(btnSubmit).on('click', function () {
            var isFormValid = $(formIdSelector).validate().form();
            if (isFormValid) {
                $(modalId).modal({ backdrop: 'static' });
                getRecipientsList($(ddRecipientNameSelector).val(), function (list) {
                    var htmlString = getRecipientListHtml(list);
                    $(ddRecipientListSelector).html(htmlString);

                    $(modalId + " .modal-close").on('click', function () {
                        $(modalId).modal('hide')
                    })
                    $('#btn-send').on('click', function () {
                        $(modalId).modal('hide')
                        $(formIdSelector).submit();
                    });
                })
            }
        })
    });


    function getEmailSendProgress(logFileName, totalRecipientsCount) {
        $.get('/home/GetProgress', { fileName: logFileName }, function (data, status, jqXHR) {
            var percent = (parseInt(data.completed) / parseInt(totalRecipientsCount) * 100);
            $('#send-progress').attr('aria-valuenow', percent);
            $('#send-progress').css('width', percent + '%');
            $('#sendCountText').html(parseInt(data.completed));

            if (percent >= 100) {
                $('#btn-close').show();
                $('#progress-text').html('Email sending completed...');
                clearInterval(intervalId);

                // reset form
                $(':input', formIdSelector)
                    .not(':button, :submit, :reset')
                    .val('')
                    .removeAttr('checked')
                    .removeAttr('selected');
                $(textEditorId).summernote('reset');
            }
        })
    }

    function getEditorTemplate(id, cb) {
        $.get('/home/GetEditorTemplate', { id }, function (data, status, jqXHR) {
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

    function getRecipientsList(recipientTemplateName, callback) {
        $.get('/MasterRecipient/GetTemplateByRecipientName', { name: recipientTemplateName }, function (data, status, jqXHR) {
            callback(data);
        })
    }

    function getRecipientListHtml(list) {
        var htmlStr = '';
        for (var i = 0; i < list.length; i++) {
            htmlStr += `<tr>
                        <td scope="row">${list[i].ClientEmail}</td>
                        <td scope="row">${list[i].CC}</td>
                        <td scope="row">${list[i].BCC}</td>
                    </tr>`
        }
        return htmlStr;
    }

})();