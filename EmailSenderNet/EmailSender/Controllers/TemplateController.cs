using EmailSender.Attributes;
using EmailSender.DAL;
using EmailSender.DbModels;
using EmailSender.Models;
using System.Configuration;
using System.Web.Mvc;

namespace EmailSender.Controllers
{
    [CustomAuthorize]
    public class TemplateController : CustomBaseController
    {
        // GET: Template
        public ActionResult Index()
        {
            var loggedInUserId = int.Parse(ConfigurationManager.AppSettings["loggedInUserId"]);
            return View(new TemplateViewModel
            {
                TemplateList = new TemplateService().GetTemplates(loggedInUserId),
                LoggedInUserId = loggedInUserId
            });
        }

        // GET: Template
        [HttpPost]
        public ActionResult Index(TemplateViewModel model)
        {
            var dbService = new TemplateService();
            var loggedInUserId = int.Parse(ConfigurationManager.AppSettings["loggedInUserId"]);

            if (ModelState.IsValid)
            {
                if (model.TemplateId.HasValue && model.TemplateId.Value > 0)
                {
                    dbService.UpdateNameAndHtml(model.TemplateId.Value, model.Name, model.Body);
                }
                else
                {
                    dbService.SaveTemplate(new DbTemplates
                    {
                        Html = model.Body,
                        Name = model.Name,
                        OwnerId = loggedInUserId,
                        Share = false
                    });
                    ModelState.Clear();
                }
            }

            return View(new TemplateViewModel
            {
                TemplateList = dbService.GetTemplates(),
                LoggedInUserId = loggedInUserId
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