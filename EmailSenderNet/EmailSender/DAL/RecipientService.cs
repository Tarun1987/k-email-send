using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using EmailSender.DbModels;
using EmailSender.Models;

namespace EmailSender.DAL
{
    public class RecipientService : BaseService
    {
        /// <summary>
        /// Get List of all recipients templates 
        /// </summary>
        /// <param name="recipientName"></param>
        /// <returns></returns>
        public IList<DbRecipients> GetRecipients(string recipientName, bool includeInactive = false)
        {
            IList<DbRecipients> list = new List<DbRecipients>();
            using (SqlConnection connection = GetDbConnection())
            {
                string oString = $"Select * from {RecipientTable} WHERE TemplateName = '{recipientName}'";
                if (!includeInactive) oString += " AND IsActive = 1";

                SqlCommand oCmd = new SqlCommand(oString, connection);
                try
                {
                    connection.Open();
                    using (SqlDataReader oReader = oCmd.ExecuteReader())
                    {
                        while (oReader.Read())
                        {
                            var obj = new DbRecipients
                            {
                                BCC = oReader["BCC"].ToString(),
                                CC = oReader["CC"].ToString(),
                                ClientEmail = oReader["ClientEmail"].ToString(),
                                ClientName = oReader["ClientName"].ToString(),
                                TemplateId = Convert.ToInt32(oReader["TemplateId"]),
                                TemplateName = oReader["TemplateName"].ToString(),
                                Share = oReader["Share"] == DBNull.Value ? false : Convert.ToBoolean(oReader["Share"]),
                                IsActive = oReader["IsActive"] == DBNull.Value ? true : Convert.ToBoolean(oReader["IsActive"]),
                            };

                            list.Add(obj);
                        }

                        connection.Close();
                    }
                }
                catch (Exception e)
                {

                }
            }
            return list;
        }

        /// <summary>
        /// Get list of all template names
        /// </summary>
        /// <returns></returns>
        public IList<string> GetRecipientTemplateNameList()
        {
            IList<string> list = new List<string>();
            using (SqlConnection connection = GetDbConnection())
            {
                SqlCommand oCmd = new SqlCommand($"Select DISTINCT TemplateName from {RecipientTable}", connection);
                try
                {
                    connection.Open();
                    using (SqlDataReader oReader = oCmd.ExecuteReader())
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
        public bool SaveRecipient(string templateName, ExcelDataModel recipient)
        {
            using (SqlConnection connection = GetDbConnection())
            {
                string oString = $"INSERT INTO {RecipientTable}(TemplateName, ClientName, ClientEmail, CC, BCC) VALUES('{templateName}', '{recipient.Name}', '{recipient.Email}', '{recipient.CC}', '{recipient.BCC}');";
                SqlCommand oCmd = new SqlCommand(oString, connection);
                try
                {
                    connection.Open();
                    oCmd.ExecuteNonQuery();
                    connection.Close();
                    return true;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        /// <summary>
        /// Update recipients 
        /// </summary>
        /// <param name="model">Db recipients</param>
        /// <returns></returns>
        public bool UpdateRecipient(DbRecipients model)
        {
            using (SqlConnection connection = GetDbConnection())
            {
                string oString = $"UPDATE {RecipientTable} SET ClientName='{model.ClientName}', BCC='{model.BCC}', ClientEmail='{model.ClientEmail}', CC='{model.CC}', Share={(model.Share ? 1 : 0)}, IsActive={(model.IsActive ? 1 : 0)} WHERE TemplateId={model.TemplateId}";
                SqlCommand oCmd = new SqlCommand(oString, connection);
                try
                {
                    connection.Open();
                    oCmd.ExecuteNonQuery();
                    connection.Close();
                    return true;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }
    }
}