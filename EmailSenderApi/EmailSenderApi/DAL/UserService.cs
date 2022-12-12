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

            return list.Count > 0 ? list[0] : default(User);
        }
    }
}