﻿using EmailSenderApi.DAL;
using EmailSenderApi.Models.Request;
using EmailSenderApi.Models.Response;
using System.Web.Http;

namespace EmailSenderApi.Controllers
{
    public class SignatureController : BaseController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            var list = new SignatureService().GetSignatures(LoggedInUserId);
            return Ok(list);
        }

        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            var dbService = new SignatureService();
            var data = dbService.GetSignatureById(id);
            return Ok(data);
        }

        [HttpPost]
        public IHttpActionResult Post(SignatureModel model)
        {
            var dbService = new SignatureService();
            if (ModelState.IsValid)
            {
                if (model.SignatureId.HasValue && model.SignatureId.Value > 0)
                {
                    dbService.UpdateNameAndHtml(model.SignatureId.Value, model.Name, model.Body, LoggedInUserId);
                }
                else
                {
                    dbService.Save(new SignatureTemplate
                    {
                        Html = model.Body,
                        Name = model.Name,
                        OwnerId = LoggedInUserId,
                        Share = false
                    });
                }
            }

            return Ok();
        }

        [HttpPut]
        public IHttpActionResult Put(ShareStatusUpdateModel model)
        {
            var dbService = new SignatureService();
            var result = dbService.UpdateShareStatus(model.Id, model.Share, LoggedInUserId);
            return Ok(result ? "OK" : "FAIL");
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            var dbService = new SignatureService();
            var result = dbService.Delete(id, LoggedInUserId);
            return Ok(result ? "OK" : "FAIL");
        }

    }
}
