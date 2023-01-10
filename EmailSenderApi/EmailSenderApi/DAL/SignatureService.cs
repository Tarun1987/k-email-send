using EmailSenderApi.Helpers;
using EmailSenderApi.Models.Response;
using System;
using System.Collections.Generic;
using System.Data.SQLite;

namespace EmailSenderApi.DAL
{
    public class SignatureService : BaseService
    {
        public IList<SignatureTemplate> GetSignatures(int loggedInUserId, bool onlyMy)
        {
            IList<SignatureTemplate> list = new List<SignatureTemplate>();
            using (var connection = GetDbConnection())
            {
                var command = $"Select t.*, u.Name as FirstName, u.LastName FROM {EmailSignatures} t LEFT JOIN {Users} u on t.OwnerId = u.Id WHERE t.Share = 1";
                if (onlyMy)
                    command += $" OR OwnerId={loggedInUserId};";

                var oCmd = new SQLiteCommand(command, connection);
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
                                LoggedInUserId = loggedInUserId,
                                FirstName = oReader["FirstName"].ToString(),
                                LastName = oReader["LastName"].ToString(),
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
        /// Get Signatures by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public SignatureTemplate GetSignatureById(int id)
        {
            IList<SignatureTemplate> list = new List<SignatureTemplate>();
            using (var connection = GetDbConnection())
            {
                var oCmd = new SQLiteCommand($"Select t.*, u.Name as FirstName, u.LastName FROM {EmailSignatures} t LEFT JOIN {Users} u on t.OwnerId = u.Id WHERE t.Id={id}", connection);
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
                                FirstName = oReader["FirstName"].ToString(),
                                LastName = oReader["LastName"].ToString()
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
            return list.Count > 0 ? list[0] : null;
        }

        /// <summary>
        /// Update Signature share status 
        /// </summary>
        /// <param name="id">Id</param>
        /// <param name="shareStatus">Boolean</param>
        /// <returns></returns>
        public bool UpdateShareStatus(int id, bool shareStatus, int ownerId)
        {
            using (var connection = GetDbConnection())
            {
                string oString = $"UPDATE {EmailSignatures} SET Share={(shareStatus ? 1 : 0)} WHERE Id={id} AND ownerId={ownerId}";
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
        /// Save Signature in db
        /// </summary>
        /// <param name="templateData">Signature data</param>
        /// <returns>Success/Failure</returns>
        public bool Save(SignatureTemplate data)
        {
            using (var connection = GetDbConnection())
            {
                string oString = $"INSERT INTO {EmailSignatures}(Name, Html, OwnerId, Share) VALUES('{data.Name}', '{data.Html}', {data.OwnerId}, {(data.Share ? 1 : 0)});";
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
        /// Update Signature name and body
        /// </summary>
        /// <param name="id">Signature Id</param>
        /// <param name="name">Name</param>
        /// <param name="html">html</param>
        /// <returns></returns>
        public bool UpdateNameAndHtml(int id, string name, string html, int ownerId)
        {
            using (var connection = GetDbConnection())
            {
                string oString = $"UPDATE {EmailSignatures} SET Name='{name}', Html='{html}' WHERE Id={id} AND ownerId={ownerId}";
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
        /// Delete data
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool Delete(int id, int ownerId)
        {
            using (var connection = GetDbConnection())
            {
                string oString = $"DELETE FROM {EmailSignatures} WHERE Id={id} AND ownerId={ownerId}";
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