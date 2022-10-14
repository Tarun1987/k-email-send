using EmailSender.Helpers;
using EmailSender.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace EmailSender.Controllers
{
    public class HomeController : CustomBaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(EmailSendModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (!model.UseDefaultTemplate && model.RecipientFile == null)
                    {
                        return View(model);
                    }

                    // Set log file name
                    string logFileName = $"log_{DateTime.Now.Ticks}.txt";

                    // Save Attachment file
                    var attachmentFilePath = SaveAttachmentFile(model.AttachmentFile);

                    // Get email list by reading excel file.
                    var emailList = GetRecipientsListFromFile(model);

                    Thread myNewThread = new Thread(() => SendEmailInBackground(emailList, model.Subject, model.GetEmailBody(), attachmentFilePath, logFileName));
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

            return View();
        }

        public JsonResult GetProgress(string fileName)
        {
            var completedEmail = GetCompletedEmail(fileName);
            return Json(new { completed = completedEmail.Count, fileName, completedEmail });
        }

        public JsonResult GetExitorTemplate(string templateName)
        {
            var htmlString = "";
            try
            {
                string path = GetEmailTemplateFilePath($"{templateName}.txt");
                htmlString = System.IO.File.ReadAllText(path);
            }
            catch (Exception) { }

            return Json(new { templateName, htmlString });
        }

        [HttpPost]
        public JsonResult sendEmail(EmailSendModel model)
        {
            string logFileName = $"log_{DateTime.Now.Ticks}.txt";
            IList<ExcelDataModel> list = new List<ExcelDataModel>();
            list.Add(new ExcelDataModel { Name = "", BCC = "", CC = "", Email = "" });
            SendEmailInBackground(list, model.Subject, model.GetEmailBody(), null, logFileName);
            return Json("OK", JsonRequestBehavior.AllowGet);
        }

        #region Private Section

        private void SendEmailInBackground(IList<ExcelDataModel> excelDataList, string subject, string body, string attachmentFilePath, string logFileName)
        {
            foreach (var data in excelDataList)
            {
                // TODO Send email function call here
                WriteToLogFile(data, logFileName);
            }
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

        private IList<ExcelDataModel> GetRecipientsListFromFile(EmailSendModel model)
        {
            var recipientFile = model.RecipientFile;
            string path = string.Empty;
            if (model.UseDefaultTemplate)
            {
                path = GetRecipientTemplateFilePath(Constants.RecipientMasterFileName);
            }
            else
            {
                string fileExtn = recipientFile.FileName.Split('.')[1];
                path = GetRecipientsFilePath($"recipients_{DateTime.Now.Ticks}.{fileExtn}");
                recipientFile.SaveAs(path);
            }

            return ReadRecipientsFromExcelFile(path);
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

        #endregion
    }
}