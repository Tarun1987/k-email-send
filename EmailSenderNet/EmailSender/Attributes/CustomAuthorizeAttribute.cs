using EmailSender.DAL;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace EmailSender.Attributes
{
    public class CustomAuthorizeAttribute : AuthorizeAttribute
    {
        public CustomAuthorizeAttribute()
        {
        }

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            bool authorize = false;

            // TODO: Get this value from IIS
            var userId = 1;

            // Check if user exist in DB
            var userInfo = new UserService().GetUserById(userId);
            if (userInfo != null && userInfo.AllowAccess)
            {
                authorize = true;
            }
            return authorize;
        }
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "UnAuthorized", action = "Index" }));
        }
    }
}