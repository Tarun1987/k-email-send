using EmailSender.Attributes;
using EmailSender.DAL;
using EmailSender.Models;
using System.Web.Mvc;

namespace EmailSender.Controllers
{
    [CustomAuthorize]
    public class ReportController : CustomBaseController
    {
        public ActionResult Index(int? page)
        {
            var pageNumber = page.HasValue ? page.Value : 1;
            var limit = 10;

            return View(new ReportViewModel
            {
                EmailHistoryList = new EmailHistoryService().GetHistoryBy(null, pageNumber, limit),
                PaginationModel = new PaginationModel(pageNumber, 74, 10) { Controller = "Report" }
            });
        }


        [HttpGet]
        public JsonResult GetHistoryById(int id)
        {
            var dbService = new EmailHistoryService();
            var data = dbService.GetById(id);
            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}