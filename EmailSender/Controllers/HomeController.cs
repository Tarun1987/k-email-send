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
                        emailList.Add("ss");
                    }
                }
            }

            return null;
        }
    }
}