using EmailSenderApi.DAL;
using EmailSenderApi.Helpers;
using EmailSenderApi.Models.Request;
using EmailSenderApi.Models.Response;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Web;
using System.Web.Http;

namespace EmailSenderApi.Controllers
{
    public class EmailSendController : BaseController
    {

        [HttpGet]
        public IHttpActionResult GetProgress(string uniqueId)
        {
            var dbService = new HistoryService();
            var result = dbService.GetHistoryBy(uniqueId, -1, -1);
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
                if (!string.IsNullOrWhiteSpace(model.AttachmentFileName))
                    attachmentFilePath = PostedAttachmentFilePath(model.AttachmentFileName);

                var signature = new SignatureService().GetSignatureById(model.SignatureId);
                if (signature == null)
                {
                    Logger.Log("Invalid signature");
                    return Fail();
                }
                model.SignatureString = signature.Html;

                // Get email list by reading excel file.
                var emailList = recipientService.GetRecipients(model.selectedRecipient, LoggedInUserId);

                Thread myNewThread = new Thread(() => SendEmailInBackground(emailList, model, attachmentFilePath, uniqueId));
                myNewThread.Start();

                return Ok(new { UniqueId = uniqueId, TotalCount = emailList.Count });
            }
            catch (Exception)
            {
                return Fail();
            }
        }

        [HttpPost]
        [Route("api/EmailSend/submitAttachment")]
        public IHttpActionResult SubmitAttachment()
        {
            try
            {
                var dbService = new RecipientService();

                //Check if Request contains File.
                if (HttpContext.Current.Request.Files.Count == 0)
                {
                    throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
                }

                HttpPostedFile postedFile = HttpContext.Current.Request.Files[0];
                string filePath = PostedAttachmentFilePath(postedFile.FileName);

                // Check if file exists
                if (System.IO.File.Exists(filePath))
                    System.IO.File.Delete(filePath);

                postedFile.SaveAs(filePath);
                return Ok(new { status = "OK", attachmentFile = postedFile.FileName });
            }
            catch (System.Exception e)
            {
                Logger.Log(e.Message);
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
