using EmailSenderApi.Helpers;
using EmailSenderApi.Models.Response;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web.Hosting;
using System.Web.Http;
using Excel = Microsoft.Office.Interop.Excel;

namespace EmailSenderApi.Controllers
{
    public class BaseController : ApiController
    {
        protected int loggedInUserId;
        protected string RecipientsFileName = "recipients_master.xlsx";

        public BaseController()
        {
            loggedInUserId = int.Parse(ConfigurationManager.AppSettings["loggedInUserId"]);
        }

        protected string RecipientsFilePath
        {
            get
            {
                return HostingEnvironment.MapPath($"~/Content/{RecipientsFileName}");
            }
        }

        protected string PostedRecipientsFilePath
        {
            get
            {
                return HostingEnvironment.MapPath($"~/Content/new_recipients.xlsx");
            }
        }

        protected string PostedAttachmentFilePath (string fileName)
        {
            return HostingEnvironment.MapPath($"~/Content/${fileName}");
        }

        protected IHttpActionResult Success()
        {
            return Ok("OK");
        }

        protected IHttpActionResult Fail()
        {
            return Ok("FAIL");
        }

        protected IHttpActionResult SuccessFail(object data)
        {
            return data != null ? Success() : Fail();
        }

        /// <summary>
        /// Get data from excel file
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns></returns>
        protected IList<Recipient> ReadRecipientsFromExcelFile(string filePath)
        {
            IList<Recipient> list = new List<Recipient>();
            Excel.Workbook excelBook = null;
            try
            {
                //create a instance for the Excel object  
                Excel.Application oExcel = new Excel.Application();

                //pass that to workbook object  
                excelBook = oExcel.Workbooks.Open(filePath);

                Excel.Worksheet wks = (Excel.Worksheet)excelBook.Worksheets[1];

                for (int i = 2; i < wks.Rows.Count; i++)
                {
                    var obj = new Recipient
                    {
                        ClientEmail = Convert.ToString(((Excel.Range)wks.Cells[i, 1]).Value),
                        BCC = Convert.ToString(((Excel.Range)wks.Cells[i, 3]).Value),
                        CC = Convert.ToString(((Excel.Range)wks.Cells[i, 2]).Value),
                        ClientName = Convert.ToString(((Excel.Range)wks.Cells[i, 4]).Value)
                    };

                    if (string.IsNullOrWhiteSpace(obj.ClientEmail)) break;
                    list.Add(obj);
                }
            }
            catch (Exception ex)
            {
                Logger.Log(ex.Message);
            }
            finally
            {
                if (excelBook != null) excelBook.Close(0);
            }

            return list;
        }

    }
}