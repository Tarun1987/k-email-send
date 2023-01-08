using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace SmartShare.Controllers
{
    public class HomeController : ApiController
    {
        [HttpGet]
        [Route("api/home/getFile")]
        public IHttpActionResult GetFile(string fileName, string filePath, string token)
        {
            //Create HTTP Response.
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (token != "1234")
            {
                response = Request.CreateErrorResponse(HttpStatusCode.Unauthorized, new HttpError { Message = "Invalid token" });
                return ResponseMessage(response);
            }

            //Read the File as Byte Array from Folder.
            try
            {
                byte[] fileData = System.IO.File.ReadAllBytes($"{filePath}\\{fileName}");
                //Set the Response Content.
                response.Content = new ByteArrayContent(fileData);

                //Set the Response Content Length.
                response.Content.Headers.ContentLength = fileData.LongLength;

                //Set the Content Disposition Header Value and FileName.
                response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                response.Content.Headers.ContentDisposition.FileName = fileName;

                //Set the File Content Type.
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

                return ResponseMessage(response);
            }
            catch (System.Exception)
            {
                response = Request.CreateErrorResponse(HttpStatusCode.NotFound, new HttpError { Message = "File not found or no permissions." });
                return ResponseMessage(response);
            }
        }
    }
}
