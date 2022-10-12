using EmailSender.DAL;
using EmailSender.DbModels;
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
            string path = GetRecipientTemplateFilePath(Constants.RecipientMasterFileName);
            // Check if file exists
            if (System.IO.File.Exists(path))
                System.IO.File.Delete(path);

            model.MasterFile.SaveAs(path);
            var recipientsList = ReadRecipientsFromExcelFile(path);
            foreach (var recipient in recipientsList)
            {
                dbService.SaveRecipient("Karteek template", recipient);
            }

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

        [HttpPost]
        public JsonResult UpdateRecipient(DbRecipients model)
        {
            var dbService = new RecipientService();
            var result = dbService.UpdateRecipient(model);
            return Json(result ? "OK" : "FAIL", JsonRequestBehavior.AllowGet);
        }
    }
}