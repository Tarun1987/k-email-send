$(document).ready(function () {
    const ddId = '#recipientTemplate';
    const tableId = '#recipientData';

    $(ddId).on('change', function () {
        var elem = $(this);
        getEditorTemplateString(elem.val(), function (list) {
            var html = getTableBody(list);
            $(tableId).html(html);
        });
    });
});


function getEditorTemplateString(recipientName, cb) {
    $.get('/MasterRecipient/GetTemplateByRecipientName', { recipientName }, function (data, status, jqXHR) {
        cb(data);
    })
}


function getTableBody(list) {
    var html = '';
    for (var i = 0; i < list.length; i++) {
        html += '<tr>';
        html += '<td>' + list[i].ClientEmail + '</td>';
        html += '<td>' + list[i].CC + '</td>';
        html += '<td>' + list[i].BCC + '</td>';
        html += '<td>' + list[i].ClientName + '</td>';
        html += '</tr>';
    }

    return html;

}