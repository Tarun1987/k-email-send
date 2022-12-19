using EmailSenderApi.Helpers;
using EmailSenderApi.Models.Response;
using System;
using System.Collections.Generic;
using System.Data.SQLite;

namespace EmailSenderApi.DAL
{
    public class RecipientService : BaseService
    {
        /// <summary>
        /// Get List of all recipients templates 
        /// </summary>
        /// <param name="recipientName"></param>
        /// <returns></returns>
        public IList<Recipient> GetRecipients(string recipientName, int loggedInUserId, bool includeInactive = false)
        {
            IList<Recipient> list = new List<Recipient>();
            using (var connection = GetDbConnection())
            {
                string oString = $"Select * from {RecipientTable} WHERE TemplateName = '{recipientName}' AND (OwnerId={loggedInUserId} OR Share = 1)";
                if (!includeInactive) oString += " AND IsActive = 1 AND Share = 1";

                var oCmd = new SQLiteCommand(oString, connection);
                try
                {
                    connection.Open();
                    using (var oReader = oCmd.ExecuteReader())
                    {
                        while (oReader.Read())
                        {
                            var obj = new Recipient
                            {
                                BCC = oReader["BCC"].ToString(),
                                CC = oReader["CC"].ToString(),
                                ClientEmail = oReader["ClientEmail"].ToString(),
                                ClientName = oReader["ClientName"].ToString(),
                                TemplateId = Convert.ToInt32(oReader["TemplateId"]),
                                TemplateName = oReader["TemplateName"].ToString(),
                                Share = oReader["Share"] == DBNull.Value ? false : Convert.ToBoolean(oReader["Share"]),
                                IsActive = oReader["IsActive"] == DBNull.Value ? true : Convert.ToBoolean(oReader["IsActive"]),
                                IsEditable = loggedInUserId == Convert.ToInt32(oReader["OwnerId"])
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
        /// Get list of all template names
        /// </summary>
        /// <returns></returns>
        public IList<string> GetRecipientTemplateNameList(int ownerId, bool onlyMy)
        {
            IList<string> list = new List<string>();
            using (var connection = GetDbConnection())
            {
                var command = $"Select DISTINCT TemplateName from {RecipientTable} WHERE Share = 1";
                if (onlyMy)
                    command += $" OR OwnerId = {ownerId}";

                var oCmd = new SQLiteCommand(command, connection);
                try
                {
                    connection.Open();
                    using (var oReader = oCmd.ExecuteReader())
                    {
                        while (oReader.Read())
                        {
                            list.Add(oReader["TemplateName"].ToString());
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
        /// Save recipient entry to DB
        /// </summary>
        /// <param name="templateName">Name of template</param>
        /// <param name="recipient">List of recpients</param>
        /// <returns></returns>
        public bool SaveRecipient(string templateName, Recipient recipient, int ownerId)
        {
            using (var connection = GetDbConnection())
            {
                string oString = $"INSERT INTO {RecipientTable}(TemplateName, ClientName, ClientEmail, CC, BCC, OwnerId) VALUES('{templateName}', '{recipient.ClientName}', '{recipient.ClientEmail}', '{recipient.CC}', '{recipient.BCC}', {ownerId});";
                var oCmd = new SQLiteCommand(oString, connection);
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
        /// Update recipients 
        /// </summary>
        /// <param name="model">Db recipients</param>
        /// <returns></returns>
        public bool UpdateRecipient(Recipient model)
        {
            using (var connection = GetDbConnection())
            {
                string oString = $"UPDATE {RecipientTable} SET ClientName='{model.ClientName}', BCC='{model.BCC}', ClientEmail='{model.ClientEmail}', CC='{model.CC}', Share={(model.Share ? 1 : 0)}, IsActive={(model.IsActive ? 1 : 0)} WHERE TemplateId={model.TemplateId}";
                var oCmd = new SQLiteCommand(oString, connection);
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
    }
}