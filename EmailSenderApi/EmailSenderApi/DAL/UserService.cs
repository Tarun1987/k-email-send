using EmailSenderApi.Helpers;
using EmailSenderApi.Models.Response;
using System;
using System.Collections.Generic;
using System.Data.SQLite;

namespace EmailSenderApi.DAL
{
    public class UserService : BaseService
    {
        /// <summary>
        /// Get User by Id
        /// </summary>
        /// <param name="userId">User Id</param>
        /// <returns>User Info</returns>
        public User GetUserById(int userId)
        {
            IList<User> list = new List<User>();
            using (var connection = GetDbConnection())
            {
                var oCmd = new SQLiteCommand($"Select * from {Users} WHERE Id={userId}", connection);
                try
                {
                    connection.Open();
                    using (var oReader = oCmd.ExecuteReader())
                    {
                        while (oReader.Read())
                        {
                            var obj = new User
                            {
                                Name = oReader["Name"].ToString(),
                                AllowAccess = Convert.ToBoolean(oReader["AllowAccess"]),
                                LastName = oReader["LastName"].ToString(),
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

            return list.Count > 0 ? list[0] : default(User);
        }


        /// <summary>
        /// Save data in db
        /// </summary>
        /// <param name="User">User data</param>
        /// <returns>Success/Failure</returns>
        public bool Create(User data)
        {
            using (var connection = GetDbConnection())
            {
                string oString = $"INSERT INTO {Users}(Id, Name, LastName, AllowAccess) VALUES('{data.Id}', '{data.Name}', '{data.LastName}', {(data.AllowAccess ? 1 : 0)});";
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
        public bool Delete(int id)
        {
            using (var connection = GetDbConnection())
            {
                string oString = $"DELETE FROM {Users} WHERE Id={id}";
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