using EmailSenderApi.Helpers;
using EmailSenderApi.Models.Response;
using System;
using System.Collections.Generic;
using System.Data.SQLite;

namespace EmailSenderApi.DAL
{
    public class TemplateService : BaseService
    {
        public IList<SignatureTemplate> GetTemplates(int loggedInUserId, bool onlyMy)
        {
            IList<SignatureTemplate> list = new List<SignatureTemplate>();
            using (var connection = GetDbConnection())
            {
                var command = $"Select * from {TemplateTable} WHERE Share = 1";
                if (onlyMy)
                    command += $" OR OwnerId={loggedInUserId};";
               

                SQLiteCommand oCmd = new SQLiteCommand(command, connection);
                try
                {
                    connection.Open();
                    using (SQLiteDataReader oReader = oCmd.ExecuteReader())
                    {
                        while (oReader.Read())
                        {
                            var obj = new SignatureTemplate
                            {
                                Html = oReader["Html"].ToString(),
                                Id = Convert.ToInt32(oReader["Id"]),
                                Name = oReader["Name"].ToString(),
                                OwnerId = Convert.ToInt32(oReader["OwnerId"]),
                                Share = Convert.ToBoolean(oReader["Share"]),
                                LoggedInUserId = loggedInUserId
                            };

                            list.Add(obj);
                        }

                        connection.Close();
                    }
                }
                catch (Exception e)
                {
                    Logger.Log(e.Message);
                }
            }
            return list;
        }


        /// <summary>
        /// Get Template by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public SignatureTemplate GetTemplateById(int id)
        {
            IList<SignatureTemplate> list = new List<SignatureTemplate>();
            using (var connection = GetDbConnection())
            {
                SQLiteCommand oCmd = new SQLiteCommand($"Select * from {TemplateTable} WHERE Id={id}", connection);
                try
                {
                    connection.Open();
                    using (var oReader = oCmd.ExecuteReader())
                    {
                        while (oReader.Read())
                        {
                            var obj = new SignatureTemplate
                            {
                                Html = oReader["Html"].ToString(),
                                Id = Convert.ToInt32(oReader["Id"]),
                                Name = oReader["Name"].ToString(),
                                OwnerId = Convert.ToInt32(oReader["OwnerId"]),
                                Share = Convert.ToBoolean(oReader["Share"]),
                            };

                            list.Add(obj);
                        }

                        connection.Close();
                    }
                }
                catch (Exception e)
                {
                    Logger.Log(e.Message);
                }
            }
            return list[0];
        }

        /// <summary>
        /// Update remplate share status 
        /// </summary>
        /// <param name="id">Id</param>
        /// <param name="shareStatus">Boolean</param>
        /// <returns></returns>
        public bool UpdateShareStatus(int id, bool shareStatus, int ownerId)
        {
            using (var connection = GetDbConnection())
            {
                string oString = $"UPDATE {TemplateTable} SET Share={(shareStatus ? 1 : 0)} WHERE Id={id} and ownerId={ownerId}";
                SQLiteCommand oCmd = new SQLiteCommand(oString, connection);
                try
                {
                    connection.Open();
                    oCmd.ExecuteNonQuery();
                    connection.Close();
                    return true;
                }
                catch (Exception e)
                {
                    Logger.Log(e.Message);
                    return false;
                }
            }
        }

        /// <summary>
        /// Save template in db
        /// </summary>
        /// <param name="templateData">Template data</param>
        /// <returns>Success/Failure</returns>
        public bool SaveTemplate(SignatureTemplate data)
        {
            using (var connection = GetDbConnection())
            {
                string oString = $"INSERT INTO {TemplateTable}(Name, Html, OwnerId, Share) VALUES('{data.Name}', '{data.Html}', {data.OwnerId}, {(data.Share ? 1 : 0)});";
                SQLiteCommand oCmd = new SQLiteCommand(oString, connection);
                try
                {
                    connection.Open();
                    oCmd.ExecuteNonQuery();
                    connection.Close();
                    return true;
                }
                catch (Exception e)
                {
                    Logger.Log(e.Message);
                    return false;
                }
            }
        }


        /// <summary>
        /// Update template name and body
        /// </summary>
        /// <param name="id">Template Id</param>
        /// <param name="name">Updated Name</param>
        /// <param name="html">Updated html</param>
        /// <param name="ownerId">Owner id</param>
        /// <returns></returns>
        public bool UpdateNameAndHtml(int id, string name, string html, int ownerId)
        {
            using (var connection = GetDbConnection())
            {
                string oString = $"UPDATE {TemplateTable} SET Name='{name}', Html='{html}' WHERE Id={id} and OwnerId={ownerId}";
                SQLiteCommand oCmd = new SQLiteCommand(oString, connection);
                try
                {
                    connection.Open();
                    oCmd.ExecuteNonQuery();
                    connection.Close();
                    return true;
                }
                catch (Exception e)
                {
                    Logger.Log(e.Message);
                    return false;
                }
            }
        }


        /// <summary>
        /// Delete data
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool Delete(int id, int ownerId)
        {
            using (var connection = GetDbConnection())
            {
                string oString = $"DELETE FROM {TemplateTable} WHERE Id={id} AND OwnerId=${ownerId}";
                var oCmd = new SQLiteCommand(oString, connection);
                try
                {
                    connection.Open();
                    var count = oCmd.ExecuteNonQuery();
                    connection.Close();
                    return count > 0;
                }
                catch (Exception e)
                {
                    Logger.Log(e.Message);
                    return false;
                }
            }
        }
    }
}