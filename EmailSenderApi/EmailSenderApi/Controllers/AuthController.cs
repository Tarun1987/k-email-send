using System.Web.Http;
using EmailSenderApi.DAL;

namespace EmailSenderApi.Controllers
{
    public class AuthController : BaseController
    {
        public IHttpActionResult Get()
        {
            // TODO: Get UserId from IIS server code
            var userId = 1;

            var userData = new UserService().GetUserById(userId);
            return Ok(new
            {
                allowAccess = userData != null ? userData.AllowAccess : false,
                name = userData != null ? userData.Name : ""
            });
        }
    }
}
