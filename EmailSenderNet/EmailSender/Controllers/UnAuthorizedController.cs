using System.Web.Mvc;

namespace EmailSender.Controllers
{
    public class UnAuthorizedController : Controller
    {
        // GET: UnAuthorized
        public ActionResult Index()
        {
            return View();
        }
    }
}