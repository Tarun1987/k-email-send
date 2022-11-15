using EmailSenderApi.DAL;
using EmailSenderApi.Models.Request;
using EmailSenderApi.Models.Response;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Web.Http;

namespace EmailSenderApi.Controllers
{
    public class EmailSendController : BaseController
    {

        [HttpGet]
        public IHttpActionResult GetProgress(string uniqueId)
        {
            var dbService = new HistoryService();
            var result = dbService.GetHistoryBy(uniqueId);
            return Ok(new { completed = result.Count, uniqueId });
        }

        [HttpPost]
        public IHttpActionResult Post(EmailSendModel model)
        {
            try
            {
                // Set log file name
                string uniqueId = $"{DateTime.Now.Ticks}";

                var recipientService = new RecipientService();

                var attachmentFilePath = "";

                // Get email list by reading excel file.
                var emailList = recipientService.GetRecipients(model.selectedRecipient);

                Thread myNewThread = new Thread(() => SendEmailInBackground(emailList, model, attachmentFilePath, uniqueId));
                myNewThread.Start();

                return Ok(new { UniqueId = uniqueId, TotalCount = emailList.Count });
            }
            catch (Exception)
            {
                return Fail();
            }
        }


        #region private section

        /// <summary>
        /// Send email in background
        /// </summary>
        /// <param name="recipientList">List of all recipients</param>
        /// <param name="model">Data submitted from front end</param>
        /// <param name="attachmentFilePath">Path of saved attachment file</param>
        /// <param name="uniqueId">Log file name</param>
        private void SendEmailInBackground(IList<Recipient> recipientList, EmailSendModel model, string attachmentFilePath, string uniqueId)
        {
            foreach (var data in recipientList)
            {
                Thread.Sleep(1000);
                var emailSendStatus = SendEmail(data.ClientEmail, model.GetEmailBody(), model.Subject, data.CC, data.BCC, attachmentFilePath);

                new HistoryService().SaveHistory(new History
                {
                    Html = model.GetEmailBody(),
                    RecipientTemplateName = model.selectedRecipient,
                    SendAt = DateTime.Now,
                    Status = emailSendStatus ? "Success" : "Failed",
                    UniqueId = uniqueId
                });
            }
        }

        /// <summary>
        /// Send email
        /// </summary>
        /// <param name="email"></param>
        /// <param name="body"></param>
        /// <param name="subject"></param>
        /// <param name="cc"></param>
        /// <param name="bcc"></param>
        /// <param name="attachmentFilePath"></param>
        /// <returns></returns>
        private bool SendEmail(string email, string body, string subject, string cc, string bcc, string attachmentFilePath)
        {
            return true;
            // Todo: Email sending code here
        }

        #endregion

    }
}
