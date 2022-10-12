using EmailSender.DbModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace EmailSender.DAL
{
    public class TemplateService : BaseService
    {
        /// <summary>
        /// Get List of all templates 
        /// </summary>
        /// <returns></returns>
        public IList<DbTemplates> GetTemplates()
        {
            IList<DbTemplates> list = new List<DbTemplates>();
            //using (SqlConnection connection = GetDbConnection())
            //{
            //    string oString = $"Select * from Template";
            //    SqlCommand oCmd = new SqlCommand(oString, connection);
            //    try
            //    {
            //        connection.Open();
            //        using (SqlDataReader oReader = oCmd.ExecuteReader())
            //        {
            //            while (oReader.Read())
            //            {
            //                var obj = new DbTemplates
            //                {
            //                    Html = oReader["BCC"].ToString(),
            //                    Id = Convert.ToInt32(oReader["CC"]),
            //                    Name = oReader["ClientEmail"].ToString(),
            //                    OwnerId = Convert.ToInt32(oReader["ClientName"]),
            //                    Share = Convert.ToBoolean(oReader["RecipientTemplateId"]),
            //                };

            //                list.Add(obj);
            //            }

            //            connection.Close();
            //        }
            //    }
            //    catch (Exception e)
            //    {

            //    }
            //}

            list.Add(new DbTemplates { Id = 1 });
            list.Add(new DbTemplates { Id = 2, Share = true });
            return list;
        }



        /// <summary>
        /// Get Template by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public DbTemplates GetTemplateById(int id)
        {
            return new DbTemplates
            {
                Id = id,
                Html = $"<p>This is html {id}"
            };
        }
    }
}