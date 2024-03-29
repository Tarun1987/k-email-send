﻿(() => {

    const editSelector = '[data-edit]';
    const cancelSelector = '[data-cancel]';
    const saveSelector = '[data-submit]';
    const uploadNewSelector = '#MasterFile';
    const submitCancelContainerSelector = '#upload-master-cancel';
    const btnCancelSelector = '#btn-master-cancel';

    $(document).ready(function () {
        const ddId = '#recipientTemplate';
        const tableId = '#recipientData';

        $(ddId).on('change', function () {
            var elem = $(this);
            getEditorTemplateString(elem.val(), function (list) {
                var html = getTableBody(list);
                $(tableId).html(html);
                bindDynamicEvents();
            });
        });

        $(uploadNewSelector).change(function () {
            if ($(this).val()) {
                $(submitCancelContainerSelector).show();
            }
        })

        $(btnCancelSelector).click(function () {
            $(submitCancelContainerSelector).hide();
            $(uploadNewSelector).val('');
        })
    });

    function bindDynamicEvents() {


        $(editSelector).on('click', function () {
            var elem = $(this);
            var parentRow = elem.closest('[data-row]');
            toggleInputs(parentRow, true);
        })

        $(cancelSelector).on('click', function () {
            var elem = $(this);
            var parentRow = elem.closest('[data-row]');
            toggleInputs(parentRow, false);
        })

        $(saveSelector).on('click', function () {
            var elem = $(this);
            var parentRow = elem.closest('[data-row]');
            var data = getDataToPost(parentRow);
            $.post('/MasterRecipient/UpdateRecipient', data, function (result, status, jqXHR) {
                if (result === "OK") {
                    alert('Success');
                    toggleInputs(parentRow, false);
                    updateLabel(parentRow);
                }
                else {
                    alert('Failed');
                }
            })
        })
    }

    function toggleInputs(parentRow, show = true) {
        var tdList = parentRow.children('td')
        for (var i = 0; i < tdList.length; i++) {
            var td = tdList[i];
            if (show) {
                $(td).children('span').hide();
                $(td).children(editSelector).hide();
                $(td).children(saveSelector).show();
                $(td).children(cancelSelector).show();
                $(td).children('input').show();
            }
            else {
                $(td).children('span').show();
                $(td).children(editSelector).show();
                $(td).children(saveSelector).hide();
                $(td).children(cancelSelector).hide();
                $(td).children('input').hide();
            }
        }
    }

    function getEditorTemplateString(recipientName, cb) {
        $.get('/MasterRecipient/GetTemplateByRecipientName', { name: recipientName, includeInactive: true }, function (data, status, jqXHR) {
            cb(data);
        })
    }

    function getTableBody(list) {
        var html = '';
        for (var i = 0; i < list.length; i++) {
            html += '<tr data-row="' + list[i].TemplateId + '">';
            html += '<td>' + getTableCellHtml("ClientEmail", list[i].ClientEmail) + '</td>';
            html += '<td>' + getTableCellHtml("CC", list[i].CC) + '</td>';
            html += '<td>' + getTableCellHtml("BCC", list[i].BCC) + '</td>';
            html += '<td>' + getTableCellHtml("ClientName", list[i].ClientName) + '</td>';
            html += '<td>' + getTableCellCheckboxHtml("Share", list[i].Share) + '</td>';
            html += '<td>' + getTableCellCheckboxHtml("IsActive", list[i].IsActive) + '</td>';
            html += getActionCellHTML();
            html += '</tr>';
        }
        return html;
    }

    function getTableCellHtml(fieldName, value) {
        var html = '';
        html += '<input type="text" class="form-control text-box single-line" data-input="' + fieldName + '" style="display:none" value="' + value + '" />';
        html += '<span data-label="' + fieldName + '">' + value + '</span>';
        return html
    }

    function getTableCellCheckboxHtml(fieldName, value) {
        var html = '';
        html += '<input type="checkbox" class="form-check-input" data-input="' + fieldName + '" style="display:none;cursor:pointer" ' + (value ? "checked" : "") + ' />';
        html += '<span class="badge ' + (value ? "bg-success" : "bg-danger") + '" data-label="' + fieldName + '">' + value + '</span>';
        return html
    }

    function getActionCellHTML() {
        var html = '<td> ';
        html += '<i data-edit style="cursor:pointer" title="Edit this" class="mdi mdi-pencil"></i>';
        html += '<button data-submit type="button" class="btn btn-sm btn-primary" style="display:none;margin-right:5px">Ok</button>';
        html += '<button data-cancel type = "button" class="btn btn-sm btn-danger" style="display:none"> Reset</button >';
        html += '</td>';
        return html;
    }

    function getDataToPost(parentRow) {
        var obj = {
            TemplateId: parentRow.attr('data-row')
        }
        var tdList = parentRow.children('td')
        for (var i = 0; i < tdList.length; i++) {
            var td = tdList[i];
            var input = $(td).children('input').first();
            var span = $(td).children('span').first();
            if (input && span && span.attr('data-label') && input.val()) {
                obj[span.attr('data-label')] = input.val();
                if (input.is(":checkbox")) {
                    obj[span.attr('data-label')] = input.is(":checked")
                }
            }

        }
        return obj;
    }

    function updateLabel(parentRow) {
        var tdList = parentRow.children('td')
        for (var i = 0; i < tdList.length; i++) {
            var td = tdList[i];
            var input = $(td).children('input').first();
            var span = $(td).children('span').first();
            if (input && span) {
                if (input.is(":checkbox")) {
                    span.html(input.is(":checked") ? "true" : "false");
                }
                else {
                    span.html(input.val());
                }
            }
        }
    }

})();