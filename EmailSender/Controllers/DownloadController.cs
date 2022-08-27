using EmailSender.Helpers;
using System.Web.Mvc;

namespace EmailSender.Controllers
{
    public class DownloadController : CustomBaseController
    {

        [HttpGet]
        public ActionResult RecipientsBlankTemplate()
        {
            var path = GetRecipientTemplateFilePath(Constants.RecipientBlankFileName);
            byte[] fileBytes = System.IO.File.ReadAllBytes(path);
            return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Constants.RecipientBlankFileName);
        }

        [HttpGet]
        public ActionResult RecipientsMasterTemplate()
        {
            var path = GetRecipientTemplateFilePath(Constants.RecipientMasterFileName);
            byte[] fileBytes = System.IO.File.ReadAllBytes(path);
            return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Constants.RecipientMasterFileName);
        }

        [HttpGet]
        public ActionResult UploadedRecipientsFile(string fileName)
        {
            var path = Server.MapPath("~/Content/Recipients/" + fileName);
            byte[] fileBytes = System.IO.File.ReadAllBytes(path);
            return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
        }


        #region Private section

        private string GetRecipientTemplateFilePath(string fileName)
        {
            return Server.MapPath("~/Content/Templates/" + fileName);
        }

        #endregion
    }
}