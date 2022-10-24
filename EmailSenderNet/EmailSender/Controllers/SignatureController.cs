using EmailSender.DAL;
using EmailSender.DbModels;
using EmailSender.Models;
using System.Configuration;
using System.Web.Mvc;

namespace EmailSender.Controllers
{
    public class SignatureController : CustomBaseController
    {
        // GET: Template
        public ActionResult Index()
        {
            var loggedInUserId = int.Parse(ConfigurationManager.AppSettings["loggedInUserId"]);
            return View(new SignatureViewModel
            {
                SignatureList = new EmailSignatureService().GetSignatures(loggedInUserId),
                LoggedInUserId = loggedInUserId
            });
        }

        // GET: Template
        [HttpPost]
        public ActionResult Index(SignatureViewModel model)
        {
            var dbService = new EmailSignatureService();
            var loggedInUserId = int.Parse(ConfigurationManager.AppSettings["loggedInUserId"]);

            if (ModelState.IsValid)
            {
                if (model.SignatureId.HasValue && model.SignatureId.Value > 0)
                {
                    dbService.UpdateNameAndHtml(model.SignatureId.Value, model.Name, model.Body);
                }
                else
                {
                    dbService.Save(new EmailSignatures
                    {
                        Html = model.Body,
                        Name = model.Name,
                        OwnerId = loggedInUserId,
                        Share = false
                    });
                    ModelState.Clear();
                }
            }

            return View(new SignatureViewModel
            {
                SignatureList = dbService.GetSignatures(loggedInUserId),
                LoggedInUserId = loggedInUserId
            });
        }

        [HttpGet]
        public JsonResult GetSignatureById(int id)
        {
            var dbService = new EmailSignatureService();
            var data = dbService.GetSignatureById(id);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateShareStatus(ShareStatusUpdateModel model)
        {
            var dbService = new EmailSignatureService();
            var result = dbService.UpdateShareStatus(model.Id, model.Share);
            return Json(result ? "OK" : "FAIL", JsonRequestBehavior.AllowGet);
        }
    }
}