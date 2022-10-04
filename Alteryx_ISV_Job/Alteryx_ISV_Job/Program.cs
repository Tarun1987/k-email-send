using Alteryx_ISV_Job.Helper;
using Alteryx_ISV_Job.Model;
using Alteryx_ISV_Job.Service;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Configuration;

namespace Alteryx_ISV_Job
{
    class Program
    {
        static void Main(string[] args)
        {
            var continueString = "YES";

            Logger.Log($"Welcome to Alteryx ISV Job!");
            Logger.Log($"Type {continueString} to continue.");

            // Getting input from user
            //var input = Console.ReadLine();
            //if (!string.IsNullOrWhiteSpace(input) && input.ToUpper() == continueString)
            //{
            //    Logger.Log($"Running Alteryx ISV Job !!");
            //    StartProcess();
            //}
            //else
            //{
            //    Logger.Log($"Stopping Job. Thank you !");
            //}

            Logger.Log($"Running Alteryx ISV Job !!");

            IList<PostRequestObject> list = new List<PostRequestObject>();
            list.Add(new PostRequestObject { Body = "Body1", Title = "Title1", UserId = 1 });
            list.Add(new PostRequestObject { Body = "Body2", Title = "Title2", UserId = 1 });
            list.Add(new PostRequestObject { Body = "Body3", Title = "Title3", UserId = 1 });

            PostData(list);

            Console.ReadLine();
        }


        /// <summary>
        /// Start the process
        /// </summary>
        static void StartProcess()
        {
            Logger.LogProcess(1);
            var apiResponesList = GetResponseFromAPI();
            Logger.LogProcess(1, true);

            Logger.Log($"Received data from API. Count ${apiResponesList.Count}");
            if (apiResponesList.Count == 0)
            {
                Logger.Log("No data received from API. Stopping process.");
                return;
            }

            Logger.LogProcess(2);
            var dbResponseList = GetResponseFromDatabase();
            Logger.LogProcess(2, true);

            Logger.Log($"Received data from DB. Count ${dbResponseList.Count}");
            if (dbResponseList.Count == 0)
            {
                Logger.Log("No data received from DB. Stopping process.");
                return;
            }

            Logger.LogProcess(3);
            var listToPost = GetDataToPost(dbResponseList, apiResponesList);
            Logger.LogProcess(3, true);

            Logger.Log($"Items to post. Count ${dbResponseList.Count}");
            if (listToPost.Count == 0)
            {
                Logger.Log("No data to post. Stopping process.");
                return;
            }

            Logger.LogProcess(4);
            PostData(listToPost);
            Logger.LogProcess(4, true);


        }

        /// <summary>
        /// Get Responese from API call
        /// </summary>
        /// <returns></returns>
        static IList<ResponseObj> GetResponseFromAPI()
        {
            Logger.Log("Getting response from API.");
            var apiResponseStr = APIService.GET("posts");
            IList<ResponseObj> list = new List<ResponseObj>();
            if (string.IsNullOrWhiteSpace(apiResponseStr))
            {
                Logger.Log("Returned blank string from API.");
                return list;
            }

            // Parsing to response  object
            Logger.Log("Parsing API string to Object.");
            list = JsonConvert.DeserializeObject<IList<ResponseObj>>(apiResponseStr);
            return list;
        }


        /// <summary>
        /// Get Response from Database
        /// </summary>
        /// <returns></returns>
        static IList<DbObject> GetResponseFromDatabase()
        {
            IList<DbObject> list = new List<DbObject>();
            Logger.Log("Getting response from DB.");
            var connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
            using (SqlConnection myConnection = new SqlConnection(connectionString))
            {
                string oString = "Select * from Employees";
                SqlCommand oCmd = new SqlCommand(oString, myConnection);
                try
                {
                    myConnection.Open();
                    using (SqlDataReader oReader = oCmd.ExecuteReader())
                    {
                        while (oReader.Read())
                        {
                            var dbObj = new DbObject
                            {
                                Id = Convert.ToInt32(oReader["id"]),
                                MyProperty = oReader["prop2"].ToString()
                            };

                            list.Add(dbObj);
                        }

                        myConnection.Close();
                    }
                }
                catch (Exception)
                {
                    Logger.Log("Error reading data from DB");
                }
            }

            return list;
        }


        /// <summary>
        /// Filter data to post to API
        /// </summary>
        /// <param name="dbList">List of data from database</param>
        /// <param name="responseList">List of data from API</param>
        /// <returns>List of post request object</returns>
        static IList<PostRequestObject> GetDataToPost(IList<DbObject> dbList, IList<ResponseObj> responseList)
        {
            IList<PostRequestObject> listToPost = new List<PostRequestObject>();
            foreach (var dbObj in dbList)
            {
                var foundObj = responseList.FirstOrDefault(x => x.Id == dbObj.Id);
                if (foundObj != null)
                {
                    listToPost.Add(new PostRequestObject
                    {
                        Id = dbObj.Id
                    });
                }
            }

            return listToPost;
        }


        static void PostData(IList<PostRequestObject> list)
        {
            var allProperties = typeof(PostRequestObject).GetProperties();
            foreach (var obj in list)
            {
                IList<KeyValuePair<string, string>> keys = new List<KeyValuePair<string, string>>();
                foreach (var prop in allProperties.Where(x => x.Name != "Id"))
                {
                    var val = prop.GetValue(obj, null);
                    var keyName = prop.GetCustomAttributes(typeof(JsonPropertyAttribute), true).Cast<JsonPropertyAttribute>().FirstOrDefault().PropertyName;
                    keys.Add(new KeyValuePair<string, string>(keyName, Convert.ToString(val)));
                }

                var response = APIService.POST("posts", keys);
            }
        }
    }
}
