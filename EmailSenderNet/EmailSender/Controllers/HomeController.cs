using EmailSender.Attributes;
using EmailSender.DAL;
using EmailSender.DbModels;
using EmailSender.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace EmailSender.Controllers
{
    [CustomAuthorize]
    public class HomeController : CustomBaseController
    {
        [HttpGet]
        public ActionResult Index()
        {
            var templatesList = new TemplateService().GetTemplates();
            var recipientList = new RecipientService().GetRecipientTemplateNameList();
            return View(new EmailSendModel
            {
                TemplatesList = templatesList.Select(x => new SelectListItem { Text = x.Name, Value = x.Id.ToString() }).ToList(),
                RecipientTemplateNameList = recipientList.Select(x => new SelectListItem { Text = x, Value = x }).ToList(),
            });
        }

        [HttpPost]
        public ActionResult Index(EmailSendModel model)
        {
            var recipientService = new RecipientService();

            if (ModelState.IsValid)
            {
                try
                {
                    // Set log file name
                    string uniqueId = $"{DateTime.Now.Ticks}";

                    // Save Attachment file
                    var attachmentFilePath = SaveAttachmentFile(model.AttachmentFile);

                    // Get email list by reading excel file.
                    var emailList = recipientService.GetRecipients(model.RecipientTemplateName);

                    Thread myNewThread = new Thread(() => SendEmailInBackground(emailList, model, attachmentFilePath, uniqueId));
                    myNewThread.Start();

                    ViewBag.uniqueId = uniqueId;
                    ViewBag.recipientCount = emailList.Count;
                    ModelState.Clear();
                    ViewBag.Message = "Email send to all.";
                }
                catch (Exception e)
                {
                    ViewBag.Error = "Error sending email";
                }
            }

            var templatesList = new TemplateService().GetTemplates();
            var recipientList = recipientService.GetRecipientTemplateNameList();
            model.TemplatesList = templatesList.Select(x => new SelectListItem { Text = x.Name, Value = x.Id.ToString() }).ToList();
            model.RecipientTemplateNameList = recipientList.Select(x => new SelectListItem { Text = x, Value = x }).ToList();

            return View(model);
        }

        [HttpGet]
        public JsonResult GetProgress(string uniqueId)
        {
            var dbService = new EmailHistoryService();
            var result = dbService.GetHistoryBy(uniqueId);
            return Json(new { completed = result.Count, uniqueId }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetEditorTemplate(int id)
        {
            var service = new TemplateService();
            var data = service.GetTemplateById(id);
            return Json(new { templateName = data.Name, htmlString = data.Html }, JsonRequestBehavior.AllowGet);
        }

        #region Private Section

        /// <summary>
        /// Send email in background
        /// </summary>
        /// <param name="recipientList">List of all recipients</param>
        /// <param name="model">Data submitted from front end</param>
        /// <param name="attachmentFilePath">Path of saved attachment file</param>
        /// <param name="uniqueId">Log file name</param>
        private void SendEmailInBackground(IList<DbRecipients> recipientList, EmailSendModel model, string attachmentFilePath, string uniqueId)
        {
            foreach (var data in recipientList)
            {
                Thread.Sleep(1000);
                var emailSendStatus = SendEmail(data.ClientEmail, model.GetEmailBody(), model.Subject, data.CC, data.BCC, attachmentFilePath);
                new EmailHistoryService().SaveHistory(new EmailHistory
                {
                    Html = model.GetEmailBody(),
                    RecipientTemplateName = model.RecipientTemplateName,
                    SendAt = DateTime.Now,
                    Status = emailSendStatus ? "Success" : "Failed",
                    UniqueId = uniqueId
                });
            }
        }

        private string SaveAttachmentFile(HttpPostedFileBase attachmentFile)
        {
            if (!string.IsNullOrWhiteSpace(attachmentFile?.FileName))
            {
                string fileExtn = attachmentFile.FileName.Split('.')[1];
                string path = GetAttachmentFilePath($"attachment_{DateTime.Now.Ticks}.{fileExtn}");
                attachmentFile.SaveAs(path);
                return path;
            }

            return string.Empty;
        }

        private bool SendEmail(string email, string body, string subject, string cc, string bcc, string attachmentFilePath)
        {
            return true;
            // Todo: Email sending code here
        }

        private IList<string> SplitEmail(string emailStr)
        {
            if (string.IsNullOrWhiteSpace(emailStr)) return new List<string>();
            return emailStr.Split(';').ToList();
        }

        #endregion
    }
}