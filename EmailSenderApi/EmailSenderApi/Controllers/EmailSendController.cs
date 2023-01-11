using EmailSenderApi.DAL;
using EmailSenderApi.Helpers;
using EmailSenderApi.Models.Request;
using EmailSenderApi.Models.Response;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Web;
using System.Web.Http;

namespace EmailSenderApi.Controllers
{
    public class EmailSendController : BaseController
    {
        private readonly string _passedStatus = "Success";
        private readonly string _failedStatus = "Failed";

        [HttpGet]
        public IHttpActionResult GetProgress(string uniqueId)
        {
            var dbService = new HistoryService();
            var result = dbService.GetHistoryBy(uniqueId, -1, -1);
            var failed = result.Count(x => x.Status == _passedStatus);
            var passed = result.Count(x => x.Status == _failedStatus);
            return Ok(new { completed = result.Count, uniqueId, passed, failed });
        }

        [HttpPost]
        public IHttpActionResult Post(EmailSendModel model)
        {
            try
            {
                // Set log file name
                string uniqueId = $"{DateTime.Now.Ticks}";

                var recipientService = new RecipientService();

                IList<string> attachments = new List<string>();
                if (model.AttachmentFiles != null)
                {
                    foreach (var fileName in model.AttachmentFiles)
                    {
                        attachments.Add(PostedAttachmentFilePath(fileName));
                    }
                }

                var signature = new SignatureService().GetSignatureById(model.SignatureId);
                if (signature != null)
                    model.SignatureString = signature.Html;

                // Get email list by reading excel file.
                var emailList = recipientService.GetRecipients(model.selectedRecipient, LoggedInUserId);

                Thread myNewThread = new Thread(() => SendEmailInBackground(emailList, model, attachments, uniqueId));
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

                IList<string> attachmentFiles = new List<string>();
                for (int i = 0; i < HttpContext.Current.Request.Files.Count; i++)
                {
                    HttpPostedFile postedFile = HttpContext.Current.Request.Files[i];
                    string filePath = PostedAttachmentFilePath(postedFile.FileName);

                    // Check if file exists
                    if (System.IO.File.Exists(filePath))
                        System.IO.File.Delete(filePath);

                    postedFile.SaveAs(filePath);
                    attachmentFiles.Add(postedFile.FileName);
                }

                return Ok(new { status = "OK", attachmentFiles });
            }
            catch (Exception e)
            {
                Logger.Log(e.Message);
                return Fail();
            }
        }

        [HttpPost]
        [Route("api/EmailSend/previewEmailData")]
        public IHttpActionResult PreviewEmailData(EmailSendModel model)
        {
            var signature = new SignatureService().GetSignatureById(model.SignatureId);
            if (signature != null)
                model.SignatureString = signature.Html;

            return Ok(new { status = "OK", previewData = model.GetEmailBody() });
        }

        #region private section

        /// <summary>
        /// Send email in background
        /// </summary>
        /// <param name="recipientList">List of all recipients</param>
        /// <param name="model">Data submitted from front end</param>
        /// <param name="attachmentFilePath">Path of saved attachment file</param>
        /// <param name="uniqueId">Log file name</param>
        private void SendEmailInBackground(IList<Recipient> recipientList, EmailSendModel model, IList<string> attachments, string uniqueId)
        {
            foreach (var data in recipientList)
            {
                Thread.Sleep(1000);
                var emailSendStatus = SendEmail(data.ClientEmail, model.GetEmailBody(), model.Subject, data.CC, data.BCC, attachments);

                new HistoryService().SaveHistory(new History
                {
                    Html = model.GetEmailBody(),
                    RecipientTemplateName = model.selectedRecipient,
                    SendAt = DateTime.Now,
                    Status = emailSendStatus ? _passedStatus : _failedStatus,
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
        private bool SendEmail(string email, string body, string subject, string cc, string bcc, IList<string> attachments)
        {
            return true;
            // Todo: Email sending code here
        }

        #endregion

    }

}
