using EmailSender.DbModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace EmailSender.DAL
{
    public class TemplateService : BaseService
    {
        private IList<DbTemplates> GetTemplatesBy(int? loggedInUserId)
        {
            IList<DbTemplates> list = new List<DbTemplates>();
            using (SqlConnection connection = GetDbConnection())
            {
                var command = $"Select * from {TemplateTable}";
                if (loggedInUserId.HasValue)
                {
                    command += $" WHERE (OwnerId={loggedInUserId.Value} OR Share = 1);";
                }
                else
                {
                    command += ";";
                }

                SqlCommand oCmd = new SqlCommand(command, connection);
                try
                {
                    connection.Open();
                    using (SqlDataReader oReader = oCmd.ExecuteReader())
                    {
                        while (oReader.Read())
                        {
                            var obj = new DbTemplates
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

                }
            }
            return list;
        }


        /// <summary>
        /// Get List of all templates 
        /// </summary>
        /// <returns></returns>
        public IList<DbTemplates> GetTemplates()
        {
            return GetTemplatesBy(null);
        }


        public IList<DbTemplates> GetTemplates(int loggedInUserId)
        {
            return GetTemplatesBy(loggedInUserId);
        }


        /// <summary>
        /// Get Template by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public DbTemplates GetTemplateById(int id)
        {
            IList<DbTemplates> list = new List<DbTemplates>();
            using (SqlConnection connection = GetDbConnection())
            {
                SqlCommand oCmd = new SqlCommand($"Select * from {TemplateTable} WHERE Id={id}", connection);
                try
                {
                    connection.Open();
                    using (SqlDataReader oReader = oCmd.ExecuteReader())
                    {
                        while (oReader.Read())
                        {
                            var obj = new DbTemplates
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
        public bool UpdateShareStatus(int id, bool shareStatus)
        {
            using (SqlConnection connection = GetDbConnection())
            {
                string oString = $"UPDATE {TemplateTable} SET Share={(shareStatus ? 1 : 0)} WHERE Id={id}";
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
        /// Save template in db
        /// </summary>
        /// <param name="templateData">Template data</param>
        /// <returns>Success/Failure</returns>
        public bool SaveTemplate(DbTemplates data)
        {
            using (SqlConnection connection = GetDbConnection())
            {
                string oString = $"INSERT INTO {TemplateTable}(Name, Html, OwnerId, Share) VALUES('{data.Name}', '{data.Html}', {data.OwnerId}, {(data.Share ? 1 : 0)});";
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