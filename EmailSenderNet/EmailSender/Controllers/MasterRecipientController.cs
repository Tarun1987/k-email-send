using EmailSender.Attributes;
using EmailSender.DAL;
using EmailSender.DbModels;
using EmailSender.Helpers;
using EmailSender.Models;
using System.Web.Mvc;

namespace EmailSender.Controllers
{
    [CustomAuthorize]
    public class MasterRecipientController : CustomBaseController
    {
        // GET: MasterRecipient
        public ActionResult Index()
        {
            return View(new MasterRecipientViewModel
            {
                RecipientTemplateNameList = new RecipientService().GetRecipientTemplateNameList()
            });
        }

        [HttpPost]
        public ActionResult Index(MasterRecipientViewModel model)
        {
            var dbService = new RecipientService();
            if (ModelState.IsValid)
            {
                string path = GetRecipientTemplateFilePath(Constants.RecipientMasterFileName);
                // Check if file exists
                if (System.IO.File.Exists(path))
                    System.IO.File.Delete(path);

                model.MasterFile.SaveAs(path);
                var templateName = model.MasterFile.FileName.Split('.')[0];

                var recipientsList = ReadRecipientsFromExcelFile(path);
                foreach (var recipient in recipientsList)
                {
                    dbService.SaveRecipient(templateName, recipient);
                }
            }

            return View(new MasterRecipientViewModel
            {
                RecipientTemplateNameList = dbService.GetRecipientTemplateNameList()
            });
        }

        [HttpGet]
        public JsonResult GetTemplateByRecipientName(string name, bool includeInactive = false)
        {
            var dbService = new RecipientService();
            var list = dbService.GetRecipients(name, includeInactive);
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