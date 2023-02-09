using EmailSenderApi.Helpers;
using EmailSenderApi.Models.Response;
using System;
using System.Collections.Generic;
using System.Data.SQLite;

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
            using (var connection = GetDbConnection())
            {
                string oString = $"INSERT INTO {EmailHistories}(Status, Html, RecipientTemplateName, UniqueId, SendAt, ToEmail) VALUES('{data.Status}', '{data.Html}', '{data.RecipientTemplateName}', '{data.UniqueId}', '{data.SendAtDbFormat}', '{data.ToEmail}');";
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

        public IList<History> GetHistoryBy(string uniqueId, int page = 1, int limit = 10)
        {
            IList<History> list = new List<History>();
            using (var connection = GetDbConnection())
            {
                var query = $"Select * from {EmailHistories}";
                if (!string.IsNullOrWhiteSpace(uniqueId))
                {
                    query += $" WHERE UniqueId={uniqueId}";
                }

                if (limit > 0)
                {
                    query += $" ORDER BY Id DESC {Pagination.GetLimitOffsetString(page, limit)}";
                }

                var oCmd = new SQLiteCommand(query, connection);
                try
                {
                    connection.Open();
                    using (var oReader = oCmd.ExecuteReader())
                    {
                        while (oReader.Read())
                        {
                            var obj = new History
                            {
                                Id = Convert.ToInt32(oReader["Id"]),
                                Status = oReader["Status"].ToString(),
                                Html = oReader["Html"].ToString(),
                                UniqueId = oReader["UniqueId"].ToString(),
                                ToEmail = oReader["ToEmail"] is DBNull ? string.Empty : oReader["ToEmail"].ToString(),
                                RecipientTemplateName = oReader["RecipientTemplateName"].ToString(),
                                SendAt = oReader["SendAt"] is DBNull ? DateTime.Now : Convert.ToDateTime(oReader["SendAt"]),
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
        /// Get History by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public History GetById(int id)
        {
            IList<History> list = new List<History>();
            using (var connection = GetDbConnection())
            {
                var oCmd = new SQLiteCommand($"Select * from {EmailHistories} WHERE Id={id}", connection);
                try
                {
                    connection.Open();
                    using (var oReader = oCmd.ExecuteReader())
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
                    Logger.Log(e.Message);
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
            using (var connection = GetDbConnection())
            {
                var oCmd = new SQLiteCommand($"SELECT COUNT(1) FROM {EmailHistories};", connection);
                try
                {
                    connection.Open();
                    var count = Convert.ToInt32(oCmd.ExecuteScalar());
                    connection.Close();
                    return count;
                }
                catch (Exception e)
                {
                    Logger.Log(e.Message);
                    return 0;
                }
            }
        }
    }
}