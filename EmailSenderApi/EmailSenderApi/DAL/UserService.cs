using EmailSenderApi.Models.Response;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

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
            using (SqlConnection connection = GetDbConnection())
            {
                SqlCommand oCmd = new SqlCommand($"Select * from {Users} WHERE Id={userId}", connection);
                try
                {
                    connection.Open();
                    using (SqlDataReader oReader = oCmd.ExecuteReader())
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