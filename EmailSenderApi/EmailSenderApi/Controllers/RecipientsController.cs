using EmailSenderApi.DAL;
using EmailSenderApi.Helpers;
using EmailSenderApi.Models.Response;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace EmailSenderApi.Controllers
{
    public class RecipientsController : BaseController
    {
        // GET: api/Signature
        public IHttpActionResult Get()
        {
            var list = new RecipientService().GetRecipientTemplateNameList();
            return Ok(list);
        }

        // GET: api/Signature
        public IHttpActionResult GetByName(string name, bool includeInactive = false)
        {
            var dbService = new RecipientService();
            var list = dbService.GetRecipients(name, includeInactive);
            return Ok(list);
        }

        [HttpPost]
        public IHttpActionResult Post()
        {
            try
            {
                var dbService = new RecipientService();

                //Check if Request contains File.
                if (HttpContext.Current.Request.Files.Count == 0)
                {
                    throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
                }

                // Check if file exists
                if (System.IO.File.Exists(PostedRecipientsFilePath))
                    System.IO.File.Delete(PostedRecipientsFilePath);
                
                HttpPostedFile postedFile = HttpContext.Current.Request.Files[0];

                postedFile.SaveAs(PostedRecipientsFilePath);
                var templateName = postedFile.FileName.Split('.')[0];

                Logger.Log("Recipient upload: File saved in folder");
                var recipientsList = ReadRecipientsFromExcelFile(PostedRecipientsFilePath);
                Logger.Log($"Recipient upload: Reading excel file. total count ${recipientsList.Count}");

                foreach (var recipient in recipientsList)
                {
                    dbService.SaveRecipient(templateName, recipient);
                }

                Logger.Log($"Recipient upload: Sending success message");
                return Success();
            }
            catch (System.Exception e)
            {
                Logger.Log(e.Message);
                return Fail();
            }
        }

        [HttpPut]
        public IHttpActionResult Put(Recipient model)
        {
            var dbService = new RecipientService();
            var result = dbService.UpdateRecipient(model);
            return SuccessFail(result);
        }

        [HttpGet]
        [Route("api/Recipients/DownloadMaster")]
        public HttpResponseMessage DownloadMaster()
        {
            //Create HTTP Response.
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);

            //Read the File as Byte Array from Folder.
            byte[] fileData = System.IO.File.ReadAllBytes(RecipientsFilePath);

            //Set the Response Content.
            response.Content = new ByteArrayContent(fileData);

            //Set the Response Content Length.
            response.Content.Headers.ContentLength = fileData.LongLength;

            //Set the Content Disposition Header Value and FileName.
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = RecipientsFileName;

            //Set the File Content Type.
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            return response;
        }

    }
}
