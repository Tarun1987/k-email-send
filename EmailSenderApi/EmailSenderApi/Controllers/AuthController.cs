using System.Web.Http;
using EmailSenderApi.DAL;
using EmailSenderApi.Models.Response;

namespace EmailSenderApi.Controllers
{
    public class AuthController : BaseController
    {
        public IHttpActionResult Get()
        {
            var userData = new UserService().GetUserById(LoggedInUserId);
            return Ok(new
            {
                allowAccess = userData != null ? userData.AllowAccess : false,
                name = userData != null ? userData.Name : ""
            });
        }

        [HttpPost]
        public IHttpActionResult Post(User model)
        {
            var dbService = new UserService();
            var result = dbService.Create(model);
            return Ok(result ? "OK" : "FAIL");
        }


        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            var dbService = new UserService();
            var result = dbService.Delete(id);
            return Ok(result ? "OK" : "FAIL");
        }
    }
}
