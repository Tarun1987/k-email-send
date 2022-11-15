using EmailSenderApi.DAL;
using System.Web.Http;

namespace EmailSenderApi.Controllers
{
    public class ReportsController : BaseController
    {
        public IHttpActionResult Get(int? page)
        {
            var pageNumber = page.HasValue ? page.Value : 1;
            var limit = 10;

            var list = new HistoryService().GetHistoryBy(null, pageNumber, limit);
            return Ok(list);
        }

        [HttpGet]
        public IHttpActionResult GetTotalCount()
        {
            var count = new HistoryService().GetTotalCount();
            return Ok(count);
        }
    }
}
