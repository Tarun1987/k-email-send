using System.Collections.Generic;
using System.Linq;
using System.Configuration;
using System.Web.Mvc;
using System;
using URLRedirect.Helpers;

namespace URLRedirect.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            // GET Logged in user Id from IIS
            var iisUserString = "AAAA\\2";
            var loggedInUserIdArray = iisUserString.Split(new[] { "\\" }, StringSplitOptions.RemoveEmptyEntries);
            if (loggedInUserIdArray == null && loggedInUserIdArray.Length < 2)
                return View();

            var userData = new
            {
                Id = loggedInUserIdArray[1],
                Name = loggedInUserIdArray[0]
            };

            var allowedUsers = new List<string>();
            var idsString = ConfigurationManager.AppSettings["AllowedAccess"];
            if (!string.IsNullOrWhiteSpace(idsString))
            {
                allowedUsers = idsString.Split('|').ToList();
            }

            if (allowedUsers.IndexOf($"{userData.Id}") >= 0)
                return Redirect($"{ConfigurationManager.AppSettings["ReactAppURL"]}?id={SecurityHelper.Encrypt(userData.Id)}");
            else
            {
                return View();
            }
        }
    }
}