using EmailSenderApi.DAL;
using EmailSenderApi.Models.Request;
using EmailSenderApi.Models.Response;
using System.Web.Http;

namespace EmailSenderApi.Controllers
{
    public class TemplatesController : BaseController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            var list = new TemplateService().GetTemplates(loggedInUserId);
            return Ok(list);
        }

        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            var dbService = new TemplateService();
            var data = dbService.GetTemplateById(id);
            return Ok(data);
        }

        [HttpPost]
        public IHttpActionResult Post(SignatureModel model)
        {
            var dbService = new TemplateService();
            if (ModelState.IsValid)
            {
                if (model.SignatureId.HasValue && model.SignatureId.Value > 0)
                {
                    dbService.UpdateNameAndHtml(model.SignatureId.Value, model.Name, model.Body);
                }
                else
                {
                    dbService.SaveTemplate(new SignatureTemplate
                    {
                        Html = model.Body,
                        Name = model.Name,
                        OwnerId = loggedInUserId,
                        Share = false
                    });
                    ModelState.Clear();
                }
            }

            return Ok();
        }

        [HttpPut]
        public IHttpActionResult Put(ShareStatusUpdateModel model)
        {
            var dbService = new TemplateService();
            var result = dbService.UpdateShareStatus(model.Id, model.Share);
            return Ok(result ? "OK": "FAIL");
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            var dbService = new TemplateService();
            var result = dbService.Delete(id);
            return Ok(result ? "OK" : "FAIL");
        }
    }
}
