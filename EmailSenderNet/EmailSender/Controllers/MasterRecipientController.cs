using EmailSender.Helpers;
using EmailSender.Models;
using System.Collections.Generic;
using System.Web.Mvc;

namespace EmailSender.Controllers
{
    public class MasterRecipientController : CustomBaseController
    {
        // GET: MasterRecipient
        public ActionResult Index()
        {
            string path = GetRecipientTemplateFilePath(Constants.RecipientMasterFileName);
            var list = ReadRecipientsFromExcelFile(path);
            return View(list);
        }


        [HttpPost]
        public ActionResult Index(MasterRecipientUpdateModel model)
        {
            string path = GetRecipientTemplateFilePath(Constants.RecipientMasterFileName);
            // Check if file exists
            if (System.IO.File.Exists(path))
                System.IO.File.Delete(path);

            model.MasterFile.SaveAs(path);
            var list = ReadRecipientsFromExcelFile(path);
            return View(list);
        }
    }
}