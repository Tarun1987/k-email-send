using System.Web.Http;
using EmailSenderApi.DAL;

namespace EmailSenderApi.Controllers
{
    public class AuthController : BaseController
    {
        public IHttpActionResult Get()
        {
            var userData = new UserService().GetUserById(loggedInUserId);
            return Ok(new
            {
                allowAccess = userData != null ? userData.AllowAccess : false,
                name = userData != null ? userData.Name : ""
            });
        }
    }
}
