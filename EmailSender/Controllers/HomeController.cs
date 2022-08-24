﻿using EmailSender.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EmailSender.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Email send to all.";
            return View();
        }

        [HttpPost]
        public ActionResult Index(EmailSendModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var EmailList = GetRecipientsListFromFile(model.RecipientFile);
                    foreach (var emailTo in EmailList)
                    {
                        SendEmail(emailTo, model.Subject, model.GetEmailBody());
                    }
                    ViewBag.Message = "Email send to all.";
                }
                catch (Exception e)
                {
                    ViewBag.Error = "Error sending email";
                }
            }

            return View();
        }

        private void SendEmail (string EmailTo, string Subject, string Body)
        {
            // Code to send email
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
            return emailList;
        }
    }
}