using EmailSender.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EmailSender.Controllers
{
    public class TemplateController : CustomBaseController
    {
        // GET: Template
        public ActionResult Index()
        {
            var dbService = new TemplateService();
            var list = dbService.GetTemplates();
            return View(list);
        }

        [HttpGet]
        public JsonResult GetTemplateById(int id)
        {
            var dbService = new TemplateService();
            var data = dbService.GetTemplateById(id);
            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}