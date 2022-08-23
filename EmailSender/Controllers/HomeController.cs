using EmailSender.Models;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
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
            return View();
        }

        [HttpPost]
        public ActionResult Index(EmailSendModel membervalues)
        {
            //    //Use Namespace called :  System.IO  
            //    string FileName = Path.GetFileNameWithoutExtension(membervalues.AttachmentFile.FileName);

            //    //To Get File Extension  
            //    string FileExtension = Path.GetExtension(membervalues.AttachmentFile.FileName);

            //    //Add Current Date To Attached File Name  
            //    FileName = DateTime.Now.ToString("yyyyMMdd") + "-" + FileName.Trim() + FileExtension;

            //    //Get Upload path from Web.Config file AppSettings.  
            //    string UploadPath = "";

            //    //Its Create complete path to store in server.  
            //    membervalues.AttachmentPath = UploadPath + FileName;

            //    //To copy and save file into server.  
            //    membervalues.AttachmentFile.SaveAs(membervalues.AttachmentPath);

            var data = getRecipientsListFromFile(membervalues.RecipientFile);

            return View();
        }


        private IList<string> getRecipientsListFromFile(HttpPostedFileBase RecipientFile)
        {
            IList<string> emailList = new List<string>();
            if ((RecipientFile != null) && (RecipientFile.ContentLength > 0) && !string.IsNullOrEmpty(RecipientFile.FileName))
            {
                string fileName = RecipientFile.FileName;
                string fileContentType = RecipientFile.ContentType;
                byte[] fileBytes = new byte[RecipientFile.ContentLength];
                var data = RecipientFile.InputStream.Read(fileBytes, 0, Convert.ToInt32(RecipientFile.ContentLength));
                using (var package = new ExcelPackage(RecipientFile.InputStream))
                {
                    var currentSheet = package.Workbook.Worksheets;
                    var workSheet = currentSheet.First();
                    var noOfCol = workSheet.Dimension.End.Column;
                    var noOfRow = workSheet.Dimension.End.Row;
                    for (int rowIterator = 2; rowIterator <= noOfRow; rowIterator++)
                    {
                        emailList.Add("");
                    }
                }
            }

            return null;
        }
    }
}