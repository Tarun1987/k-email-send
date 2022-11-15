using EmailSenderApi.Helpers;
using EmailSenderApi.Models.Response;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace EmailSenderApi.DAL
{
    public class HistoryService : BaseService
    {
        /// <summary>
        /// Save History in Db
        /// </summary>
        /// <param name="model">Email History</param>
        /// <returns>Success/Failure</returns>
        public bool SaveHistory(History data)
        {
            using (SqlConnection connection = GetDbConnection())
            {
                string oString = $"INSERT INTO {EmailHistories}(Status, Html, RecipientTemplateName, UniqueId) VALUES('{data.Status}', '{data.Html}', '{data.RecipientTemplateName}', '{data.UniqueId}');";
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

        public IList<History> GetHistoryBy(string uniqueId, int page = 1, int limit = 10)
        {
            IList<History> list = new List<History>();
            using (SqlConnection connection = GetDbConnection())
            {
                var query = $"Select * from {EmailHistories}";
                if (!string.IsNullOrWhiteSpace(uniqueId))
                {
                    query += $" WHERE UniqueId={uniqueId}";
                }
                query += $" ORDER BY SendAt DESC {Pagination.GetLimitOffsetString(page, limit)}";

                SqlCommand oCmd = new SqlCommand(query, connection);
                try
                {
                    connection.Open();
                    using (SqlDataReader oReader = oCmd.ExecuteReader())
                    {
                        while (oReader.Read())
                        {
                            var obj = new History
                            {
                                Id = Convert.ToInt32(oReader["Id"]),
                                Status = oReader["Status"].ToString(),
                                Html = oReader["Html"].ToString(),
                                UniqueId = oReader["UniqueId"].ToString(),
                                RecipientTemplateName = oReader["RecipientTemplateName"].ToString(),
                                SendAt = Convert.ToDateTime(oReader["SendAt"]),
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
        /// Get History by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public History GetById(int id)
        {
            IList<History> list = new List<History>();
            using (SqlConnection connection = GetDbConnection())
            {
                SqlCommand oCmd = new SqlCommand($"Select * from {EmailHistories} WHERE Id={id}", connection);
                try
                {
                    connection.Open();
                    using (SqlDataReader oReader = oCmd.ExecuteReader())
                    {
                        while (oReader.Read())
                        {
                            var obj = new History
                            {
                                Html = oReader["Html"].ToString(),
                                Id = Convert.ToInt32(oReader["Id"]),
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
        /// Get count of all records
        /// </summary>
        /// <returns></returns>
        public int GetTotalCount()
        {
            using (SqlConnection connection = GetDbConnection())
            {
                SqlCommand oCmd = new SqlCommand($"SELECT COUNT(1) FROM {EmailHistories};", connection);
                try
                {
                    connection.Open();
                    int count = (int)oCmd.ExecuteScalar();
                    connection.Close();
                    return count;
                }
                catch (Exception e)
                {
                    return 0;
                }
            }
        }
    }
}