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
                    string logFileName = $"log_{DateTime.Now.Ticks}.txt";

                    // Save Attachment file
                    var attachmentFilePath = SaveAttachmentFile(model.AttachmentFile);

                    // Get email list by reading excel file.
                    var emailList = recipientService.GetRecipients(model.RecipientTemplateName);

                    Thread myNewThread = new Thread(() => SendEmailInBackground(emailList, model, attachmentFilePath, logFileName));
                    myNewThread.Start();

                    ViewBag.logFileName = logFileName;
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
        public JsonResult GetProgress(string fileName)
        {
            var completedEmail = GetCompletedEmail(fileName);
            return Json(new { completed = completedEmail.Count, fileName, completedEmail }, JsonRequestBehavior.AllowGet);
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
        /// <param name="logFileName">Log file name</param>
        private void SendEmailInBackground(IList<DbRecipients> recipientList, EmailSendModel model, string attachmentFilePath, string logFileName)
        {
            foreach (var data in recipientList)
            {
                Thread.Sleep(1000);
                SendEmail(data.ClientEmail, model.GetEmailBody(), model.Subject, data.CC, data.BCC, attachmentFilePath);
                WriteToLogFile(data.ClientEmail, logFileName);
            }

            // Todo: Delete attachment file from file system
        }

        private IList<string> GetCompletedEmail(string fileName)
        {
            IList<string> completedEmail = new List<string>();
            try
            {
                string path = GetLogFilePath(fileName);
                if (!System.IO.File.Exists(path))
                {
                    return completedEmail;
                }

                using (StreamReader sr = System.IO.File.OpenText(path))
                {
                    string s = "";
                    while ((s = sr.ReadLine()) != null)
                    {
                        completedEmail.Add(s);
                    }
                }
            }
            catch (Exception e)
            {
            }

            return completedEmail;

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

        private void SendEmail(string email, string body, string subject, string cc, string bcc, string attachmentFilePath)
        {
            // Todo: Email sending code here
        }

        #endregion
    }
}