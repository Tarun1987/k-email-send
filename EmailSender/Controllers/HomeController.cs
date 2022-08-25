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
    public class HomeController : Controller
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
                    // Set log file name
                    string logFileName = $"log_{DateTime.Now.Ticks}.txt";

                    // Save Attachment file
                    var attachmentFilePath = SaveAttachmentFile(model.AttachmentFile);

                    // Get email list fby reading excel file.
                    var emailList = GetRecipientsListFromFile(model.RecipientFile);

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

        [HttpGet]
        public ActionResult DownloadTemplate()
        {
            string fileName = "template.xlsx";
            var path = GetRecipientTemplateFilePath(fileName);
            byte[] fileBytes = System.IO.File.ReadAllBytes(path);
            return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
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

            return Json(new { templateName,  htmlString });
        }

        #region Private Section

        private void SendEmailInBackground(IList<ExcelDataModel> excelDataList, string subject, string body, string attachmentFilePath, string logFileName)
        {
            foreach (var data in excelDataList)
            {
                // TODO Send email function call here
                WriteToFile(data, logFileName);
            }
        }

        private void WriteToFile(ExcelDataModel data, string logFileName)
        {
            Thread.Sleep(2000);
            string path = GetLogFilePath(logFileName);
            try
            {
                // Check if file already exists. If yes, delete it.     
                if (System.IO.File.Exists(path))
                {
                    System.IO.File.AppendAllText(path, data.Email + Environment.NewLine);
                }
                else
                {
                    using (FileStream fs = System.IO.File.Create(path))
                    {
                        // Add some text to file    
                        byte[] title = new UTF8Encoding(true).GetBytes(data.Email + Environment.NewLine);
                        fs.Write(title, 0, title.Length);
                    }
                }

            }
            catch (Exception Ex)
            {
                Console.WriteLine(Ex.ToString());
            }
        }

        private string GetLogFilePath(string logFileName)
        {
            return Server.MapPath("~/Content/Logs/" + logFileName);
        }

        private string GetAttachmentFilePath(string fileName)
        {
            return Server.MapPath("~/Content/Attachments/" + fileName);
        }

        private string GetRecipientTemplateFilePath(string fileName)
        {
            return Server.MapPath("~/Content/" + fileName);
        }

        private string GetEmailTemplateFilePath(string fileName)
        {
            return Server.MapPath("~/Content/EmailTemplates/" + fileName);
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

        private IList<ExcelDataModel> GetRecipientsListFromFile(HttpPostedFileBase recipientFile)
        {
            IList<ExcelDataModel> emailList = new List<ExcelDataModel>();
            string fileExtn = recipientFile.FileName.Split('.')[1];
            string path = Server.MapPath("~/Content/Recipients/" + $"recipients_{DateTime.Now.Ticks}.{fileExtn}");
            recipientFile.SaveAs(path);
            
            // TODO:: Logic to read excel file here.

            for (int i = 0; i < 10; i++)
            {
                var email = $"test.{i}@gmail.com";
                emailList.Add(new ExcelDataModel { Email = email, CC = email, BCC = email, Name = $"Name_{i}" });

            }

            return emailList;
        }

        private string SaveAttachmentFile(HttpPostedFileBase attachmentFile)
        {
            if (!string.IsNullOrWhiteSpace(attachmentFile?.FileName))
            {
                string fileExtn = attachmentFile.FileName.Split('.')[1];
                string path = Server.MapPath("~/Content/Attachments/" + $"attachment_{DateTime.Now.Ticks}.{fileExtn}");
                attachmentFile.SaveAs(path);
                return path;
            }

            return string.Empty;
        }

        #endregion
    }
}