(() => {

    let intervalId = 0;
    const modalId = '#myModal'
    const formIdSelector = "#frmManageEmail";
    $(document).ready(function () {
        const logDataId = '#log-data';
        const btnSubmit = "#btnSubmit";
        const ddTemplateIdSelector = "#TemplateId";
        const ddRecipientNameSelector = "#RecipientTemplateName";
        const ddRecipientListSelector = "#recipientListHtml";

        var elemLogData = $(logDataId);
        if (elemLogData && elemLogData.attr("data-unique-id")) {
            $(modalId).modal({ backdrop: 'static' });
            $(modalId + " .modal-close").on('click', function () {
                $(modalId).modal('hide');
                window.location.href = window.location.href;
            })
            $('#totalToSendCounText').html(elemLogData.attr("data-recipient-count"))
            intervalId = setInterval(function () {
                getEmailSendProgress(elemLogData.attr("data-unique-id"), elemLogData.attr("data-recipient-count"));
            }, 3000)
        }

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
                if (forgotAttachment() && !confirm("Are you sure you want to continue without attachment ?")) {
                    return;
                }

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


    function getEmailSendProgress(uniqueId, totalRecipientsCount) {
        $.get('/home/GetProgress', { uniqueId: uniqueId }, function (data, status, jqXHR) {
            var percent = (parseInt(data.completed) / parseInt(totalRecipientsCount) * 100);
            $('#send-progress').attr('aria-valuenow', percent);
            $('#send-progress').css('width', percent + '%');
            $('#sendCountText').html(parseInt(data.completed));

            if (percent >= 100) {
                $('#btn-close').show();
                $('#progress-text').html('Email sending completed...');
                clearInterval(intervalId);
                $(modalId).modal('hide');

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

    function forgotAttachment() {
        var body = $('#Subject').val();
        var subject = $(textEditorId).summernote('code');
        if (!body && !subject) return false;

        var hasAttachmentKeyWord = (subject.search(/attach/) >= 0 || subject.search(/Attach/) >= 0 || body.search(/attach/) >= 0 || body.search(/Attach/)) >= 0;
        var dontHaveAttachment = !($('#AttachmentFile').val());
        return hasAttachmentKeyWord && dontHaveAttachment;

    }

})();