using EmailSender.DAL;
using EmailSender.Helpers;
using EmailSender.Models;
using System.Web.Mvc;

namespace EmailSender.Controllers
{
    public class MasterRecipientController : CustomBaseController
    {
        // GET: MasterRecipient
        public ActionResult Index()
        {
            var dbService = new RecipientService();
            var list = dbService.GetRecipientTemplateNameList();
            return View(list);
        }


        [HttpPost]
        public ActionResult Index(MasterRecipientUpdateModel model)
        {
            var dbService = new RecipientService();
            var list = dbService.GetRecipientTemplateNameList();
            return View(list);
        }

        [HttpGet]
        public JsonResult GetTemplateByRecipientName(string recipientName)
        {
            var dbService = new RecipientService();
            var list = dbService.GetRecipients(recipientName);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}