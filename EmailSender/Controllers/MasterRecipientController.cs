using EmailSender.Models;
using System.Collections.Generic;
using System.Web.Mvc;

namespace EmailSender.Controllers
{
    public class MasterRecipientController : Controller
    {
        // GET: MasterRecipient
        public ActionResult Index()
        {
            var list = new List<ReportViewModel>();
            return View(list);
        }
    }
}