using EmailSender.DAL;
using EmailSender.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Mvc;

namespace EmailSender.Controllers
{
    public class ReportController : CustomBaseController
    {
        public ActionResult Index()
        {
            var service = new EmailHistoryService();
            var list = service.GetHistoryBy(null);
            return View(list);
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