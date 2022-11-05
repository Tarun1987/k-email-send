using EmailSender.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Web.Mvc;
using Excel = Microsoft.Office.Interop.Excel;

namespace EmailSender.Controllers
{
    public class CustomBaseController : Controller
    {
        #region Private functions

        private string MapPath(string directoryName, string fileName)
        {
            return Server.MapPath($"~/Content/{directoryName}/" + fileName);
        }

        protected string GetLogFilePath(string logFileName)
        {
            return MapPath("Logs", logFileName);
        }

        protected string GetAttachmentFilePath(string fileName)
        {
            return MapPath("Attachments", fileName);
        }

        protected string GetRecipientTemplateFilePath(string fileName)
        {
            return MapPath("Templates", fileName);
        }

        protected string GetEmailTemplateFilePath(string fileName)
        {
            return MapPath("EmailTemplates", fileName);
        }

        protected string GetRecipientsFilePath(string fileName)
        {
            return MapPath("Recipients", fileName);
        }

        /// <summary>
        /// Write text to text file
        /// </summary>
        /// <param name="text">Text to write</param>
        /// <param name="logFileName">File path</param>
        protected void WriteToLogFile(string text, string logFileName)
        {
            string path = GetLogFilePath(logFileName);
            try
            {
                // Check if file already exists. If yes, delete it.     
                if (System.IO.File.Exists(path))
                {
                    System.IO.File.AppendAllText(path, text + Environment.NewLine);
                }
                else
                {
                    using (FileStream fs = System.IO.File.Create(path))
                    {
                        // Add some text to file    
                        byte[] title = new UTF8Encoding(true).GetBytes(text + Environment.NewLine);
                        fs.Write(title, 0, title.Length);
                    }
                }

            }
            catch (Exception Ex)
            {
                Console.WriteLine(Ex.ToString());
            }
        }

        /// <summary>
        /// Get data from excel file
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns></returns>
        protected IList<ExcelDataModel> ReadRecipientsFromExcelFile(string filePath)
        {
            IList<ExcelDataModel> list = new List<ExcelDataModel>();
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
                    var obj = new ExcelDataModel
                    {
                        Email = Convert.ToString(((Excel.Range)wks.Cells[i, 1]).Value),
                        BCC = Convert.ToString(((Excel.Range)wks.Cells[i, 3]).Value),
                        CC = Convert.ToString(((Excel.Range)wks.Cells[i, 2]).Value),
                        Name = Convert.ToString(((Excel.Range)wks.Cells[i, 4]).Value)
                    };

                    if (string.IsNullOrWhiteSpace(obj.Email)) break;
                    list.Add(obj);
                }
            }
            catch (Exception ex)
            {
            }
            finally
            {
                if (excelBook != null) excelBook.Close(0);
            }

            return list;
        }

        #endregion

    }
}