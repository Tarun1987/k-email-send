using EmailSender.DAL;
using EmailSender.DbModels;
using EmailSender.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
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
            return View(new TemplateViewModel
            {
                TemplateList = new TemplateService().GetTemplates(),
                LoggedInUserId = int.Parse(ConfigurationManager.AppSettings["loggedInUserId"])
            });
        }

        // GET: Template
        [HttpPost]
        public ActionResult Index(TemplateViewModel model)
        {
            var dbService = new TemplateService();
            var ownerId = int.Parse(ConfigurationManager.AppSettings["loggedInUserId"]);

            if (ModelState.IsValid)
            {
                string fileName = $"log_{DateTime.Now.Ticks}.txt";
                string path = GetRecipientTemplateFilePath(fileName);
                model.MasterFile.SaveAs(path);

                var templateName = model.MasterFile.FileName.Split('.')[0];
                dbService.SaveTemplate(new DbTemplates
                {
                    Html = System.IO.File.ReadAllText(path),
                    Name = templateName,
                    OwnerId = ownerId,
                    Share = false
                });
            }

            return View(new TemplateViewModel
            {
                TemplateList = dbService.GetTemplates(),
                LoggedInUserId = ownerId
            });
        }

        [HttpGet]
        public JsonResult GetTemplateById(int id)
        {
            var dbService = new TemplateService();
            var data = dbService.GetTemplateById(id);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateShareStatus(ShareStatusUpdateModel model)
        {
            var dbService = new TemplateService();
            var result = dbService.UpdateShareStatus(model.Id, model.Share);
            return Json(result ? "OK" : "FAIL", JsonRequestBehavior.AllowGet);
        }
    }
}