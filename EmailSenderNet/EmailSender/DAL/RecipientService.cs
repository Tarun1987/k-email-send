using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using EmailSender.DbModels;

namespace EmailSender.DAL
{
    public class RecipientService : BaseService
    {
        /// <summary>
        /// Get List of all recipients templates 
        /// </summary>
        /// <param name="templateName"></param>
        /// <returns></returns>
        public IList<DbRecipients> GetRecipients(string templateName)
        {
            IList<DbRecipients> list = new List<DbRecipients>();
            using (SqlConnection connection = GetDbConnection())
            {
                string oString = $"Select * from Recipients WHERE RecipientTemplateName = '{templateName}'";
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
                                TemplateId = Convert.ToInt32(oReader["RecipientTemplateId"]),
                                TemplateName = oReader["RecipientTemplateName"].ToString()
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
            //using (SqlConnection connection = GetDbConnection())
            //{
            //    string oString = "Select DISTINCT RecipientTemplateName from Recipients";
            //    SqlCommand oCmd = new SqlCommand(oString, connection);
            //    try
            //    {
            //        connection.Open();
            //        using (SqlDataReader oReader = oCmd.ExecuteReader())
            //        {
            //            while (oReader.Read())
            //            {
            //                list.Add(oReader["prop2"].ToString());
            //            }

            //            connection.Close();
            //        }
            //    }
            //    catch (Exception e)
            //    {

            //    }
            //}

            list.Add("Item 1");
            list.Add("Item 2");
            return list;
        }

    }
}