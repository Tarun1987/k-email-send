using EmailSenderApi.Helpers;
using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Web.Hosting;
using System.Web.Http;

namespace EmailSenderApi.Controllers
{
    public class TestController : BaseController
    {
        private string _dbStr = $"Data Source={HostingEnvironment.MapPath($"~/EmailSender.db")};Version=3;";

        [HttpGet]
        [Route("api/test/addlastname")]
        public IHttpActionResult AddUserColumn()
        {
            try
            {
                using (var connection = new SQLiteConnection(_dbStr))
                {
                    string oString = $"ALTER TABLE Users ADD COLUMN LastName TEXT;";
                    var oCmd = new SQLiteCommand(oString, connection);
                    try
                    {
                        connection.Open();
                        oCmd.ExecuteNonQuery();
                        connection.Close();
                    }
                    catch (Exception e)
                    {
                        Logger.Log(e.Message);
                    }
                }
                return Ok();

            }
            catch (Exception)
            {
                return Fail();
            }
        }

        [HttpGet]
        [Route("api/test/addownerid")]
        public IHttpActionResult AddRecipientsColumn()
        {
            try
            {
                using (var connection = new SQLiteConnection(_dbStr))
                {
                    string oString = $"ALTER TABLE Recipients ADD COLUMN OwnerId INTEGER;";
                    var oCmd = new SQLiteCommand(oString, connection);
                    try
                    {
                        connection.Open();
                        oCmd.ExecuteNonQuery();
                        connection.Close();
                    }
                    catch (Exception e)
                    {
                        Logger.Log(e.Message);
                    }
                }
                return Ok();

            }
            catch (Exception)
            {
                return Fail();
            }
        }

        [HttpGet]
        [Route("api/test/addreportemail")]
        public IHttpActionResult AddReportEmailColumn()
        {
            try
            {
                using (var connection = new SQLiteConnection(_dbStr))
                {
                    string oString = $"ALTER TABLE EmailHistories ADD COLUMN ToEmail TEXT;";
                    var oCmd = new SQLiteCommand(oString, connection);
                    try
                    {
                        connection.Open();
                        oCmd.ExecuteNonQuery();
                        connection.Close();
                        return Ok("Success");

                    }
                    catch (Exception e)
                    {
                        Logger.Log(e.Message);
                        return Ok(e.Message);

                    }
                }

            }
            catch (Exception)
            {
                return Fail();
            }
        }

        [HttpGet]
        [Route("api/test/updateowner")]
        public IHttpActionResult UpdateRecipient(string templateName, int ownerId)
        {
            try
            {
                using (var connection = new SQLiteConnection(_dbStr))
                {
                    string oString = $"UPDATE Recipients SET OwnerId={ownerId} WHERE TemplateName='{templateName}'";
                    var oCmd = new SQLiteCommand(oString, connection);
                    try
                    {
                        connection.Open();
                        oCmd.ExecuteNonQuery();
                        connection.Close();
                    }
                    catch (Exception e)
                    {
                        Logger.Log(e.Message);
                    }
                }
                return Ok();

            }
            catch (Exception)
            {
                return Fail();
            }
        }


        [HttpGet]
        [Route("api/test/updatelastname")]
        public IHttpActionResult UpdateLastName(string lastName, int userId)
        {
            try
            {
                using (var connection = new SQLiteConnection(_dbStr))
                {
                    string oString = $"UPDATE Users SET LastName={lastName} WHERE Id={userId}";
                    var oCmd = new SQLiteCommand(oString, connection);
                    try
                    {
                        connection.Open();
                        oCmd.ExecuteNonQuery();
                        connection.Close();
                    }
                    catch (Exception e)
                    {
                        Logger.Log(e.Message);
                    }
                }
                return Ok();

            }
            catch (Exception)
            {
                return Fail();
            }
        }

        [HttpGet]
        [Route("api/test/email")]
        public IHttpActionResult VerifySomething(string str)
        {
            if (string.IsNullOrWhiteSpace(str)) return Ok("No data");
            var list = str.Split(',');

            var updatedList = new List<string>();
            foreach (var item in list)
            {
                var res = item.Trim()
                    .Replace(",", "")
                    .Replace("|", "")
                    .Replace(";", "");

                updatedList.Add(res);
            }

            return Ok(String.Join(",", updatedList));
        }

    }
}
