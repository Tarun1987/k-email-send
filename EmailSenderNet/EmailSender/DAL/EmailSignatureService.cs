using EmailSender.DbModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace EmailSender.DAL
{
    public class EmailSignatureService : BaseService
    {
        private IList<EmailSignatures> GetBy(int loggedInUserId)
        {
            IList<EmailSignatures> list = new List<EmailSignatures>();
            using (SqlConnection connection = GetDbConnection())
            {
                var command = $"SELECT * from {EmailSignatures}  WHERE OwnerId={loggedInUserId};";
                SqlCommand oCmd = new SqlCommand(command, connection);
                try
                {
                    connection.Open();
                    using (SqlDataReader oReader = oCmd.ExecuteReader())
                    {
                        while (oReader.Read())
                        {
                            var obj = new EmailSignatures
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
        
        public IList<EmailSignatures> GetSignatures(int loggedInUserId)
        {
            return GetBy(loggedInUserId);
        }

        /// <summary>
        /// Get Signatures by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public EmailSignatures GetSignatureById(int id)
        {
            IList<EmailSignatures> list = new List<EmailSignatures>();
            using (SqlConnection connection = GetDbConnection())
            {
                SqlCommand oCmd = new SqlCommand($"Select * from {EmailSignatures} WHERE Id={id}", connection);
                try
                {
                    connection.Open();
                    using (SqlDataReader oReader = oCmd.ExecuteReader())
                    {
                        while (oReader.Read())
                        {
                            var obj = new EmailSignatures
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
        /// Update Signature share status 
        /// </summary>
        /// <param name="id">Id</param>
        /// <param name="shareStatus">Boolean</param>
        /// <returns></returns>
        public bool UpdateShareStatus(int id, bool shareStatus)
        {
            using (SqlConnection connection = GetDbConnection())
            {
                string oString = $"UPDATE {EmailSignatures} SET Share={(shareStatus ? 1 : 0)} WHERE Id={id}";
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
        /// Save Signature in db
        /// </summary>
        /// <param name="templateData">Signature data</param>
        /// <returns>Success/Failure</returns>
        public bool Save(EmailSignatures data)
        {
            using (SqlConnection connection = GetDbConnection())
            {
                string oString = $"INSERT INTO {EmailSignatures}(Name, Html, OwnerId, Share) VALUES('{data.Name}', '{data.Html}', {data.OwnerId}, {(data.Share ? 1 : 0)});";
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
        /// Update Signature name and body
        /// </summary>
        /// <param name="id">Signature Id</param>
        /// <param name="name">Name</param>
        /// <param name="html">html</param>
        /// <returns></returns>
        public bool UpdateNameAndHtml(int id, string name, string html)
        {
            using (SqlConnection connection = GetDbConnection())
            {
                string oString = $"UPDATE {EmailSignatures} SET Name='{name}', Html='{html}' WHERE Id={id}";
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