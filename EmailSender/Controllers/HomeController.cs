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
                    string logFileName = $"log_{DateTime.Now.Ticks}.txt";
                    var EmailList = GetRecipientsListFromFile(model.RecipientFile);
                    Thread myNewThread = new Thread(() => SendEmailInBackground(EmailList, model.Subject, model.GetEmailBody(), logFileName));
                    myNewThread.Start();

                    ViewBag.logFileName = logFileName;
                    ViewBag.recipientCount = EmailList.Count;
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

        private void SendEmailInBackground(IList<string> emailList, string subject, string body, string logFileName)
        {
            foreach (var email in emailList)
            {
                // TODO Send email function call here
                WriteToFile(email, logFileName);
            }
        }

        private void WriteToFile(string email, string logFileName)
        {
            Thread.Sleep(2000);
            string path = GetFilePath(logFileName);
            try
            {
                // Check if file already exists. If yes, delete it.     
                if (System.IO.File.Exists(path))
                {
                    System.IO.File.AppendAllText(path, email + Environment.NewLine);
                }
                else
                {
                    using (FileStream fs = System.IO.File.Create(path))
                    {
                        // Add some text to file    
                        byte[] title = new UTF8Encoding(true).GetBytes(email + Environment.NewLine);
                        fs.Write(title, 0, title.Length);
                    }
                }

            }
            catch (Exception Ex)
            {
                Console.WriteLine(Ex.ToString());
            }
        }

        private string GetFilePath(string fileName)
        {
            return Server.MapPath("~/Content/Upload/" + fileName);
        }

        private IList<string> GetCompletedEmail(string fileName)
        {
            IList<string> completedEmail = new List<string>();
            try
            {
                string path = Server.MapPath("~/Content/Upload/" + fileName);
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

        private IList<string> GetRecipientsListFromFile(HttpPostedFileBase RecipientFile)
        {
            IList<string> emailList = new List<string>();
            //string path = Server.MapPath("~/Content/Upload/" + RecipientFile.FileName);
            //RecipientFile.SaveAs(path);

            //string excelConnectionString = @"Provider='Microsoft.ACE.OLEDB.12.0';Data Source='" + path + "';Extended Properties='Excel 12.0 Xml;IMEX=1'";
            //OleDbConnection excelConnection = new OleDbConnection(excelConnectionString);

            ////Sheet Name
            //excelConnection.Open();
            //string tableName = excelConnection.GetSchema("Tables").Rows[0]["TABLE_NAME"].ToString();
            //excelConnection.Close();
            ////End

            ////Putting Excel Data in DataTable
            //DataTable dataTable = new DataTable();
            //OleDbDataAdapter adapter = new OleDbDataAdapter("Select * from [" + tableName + "]", excelConnection);
            //adapter.Fill(dataTable);
            ////End

            //Session["ExcelData"] = dataTable;
            for (int i = 0; i < 10; i++)
                emailList.Add($"test.{i}@gmail.com");

            return emailList;
        }
    }
}