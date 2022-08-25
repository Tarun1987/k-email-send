using EmailSender.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Mvc;

namespace EmailSender.Controllers
{
    public class ReportController : Controller
    {
        public ActionResult Index()
        {
            var list = GetUploadedFilesList();
            return View(list);
        }

        private IList<ReportViewModel> GetUploadedFilesList()
        {
            var random = new Random();
            IList<ReportViewModel> list = new List<ReportViewModel>();
            var recipientFiles = Directory.GetFiles(Server.MapPath("~/Content/Recipients/"), "*.xlsx");
            foreach (string currentFile in recipientFiles)
            {
                FileInfo oFileInfo = new FileInfo(currentFile);
                list.Add(new ReportViewModel
                {
                    FileName = oFileInfo.Name,
                    CreatedDate = oFileInfo.CreationTime,
                    DeliveredCount = random.Next(1, 10),
                    FailedCount = random.Next(1, 10),
                    PendingCount = random.Next(2, 10)
                });
            }
            return list;
        }

        [HttpGet]
        public ActionResult DownloadFile(string fileName)
        {
            var path = Server.MapPath("~/Content/Recipients/" + fileName);
            byte[] fileBytes = System.IO.File.ReadAllBytes(path);
            return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
        }


    }
}