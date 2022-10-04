using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Alteryx_ISV_Job.Service
{
    class APIService
    {
        private static string API_BASE_URL = "https://jsonplaceholder.typicode.com/";


        public static string GET(string url)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(API_BASE_URL);
            //client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(""));
            //client.DefaultRequestHeaders.Add("", "");
            try
            {
                var result = client.GetAsync($"{API_BASE_URL}{url}").Result;
                if (result.IsSuccessStatusCode)
                {
                    return result.Content.ReadAsStringAsync().Result;
                }

                return null;
            }
            catch (Exception)
            {
                Console.WriteLine("Error in GET API");
                return null;
            }
        }


        public static string POST(string url, IList<KeyValuePair<string, string>> contentList)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(API_BASE_URL);
            //client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(""));
            //client.DefaultRequestHeaders.Add("", "");
            try
            {
                var result = client.PostAsync($"{API_BASE_URL}{url}", new FormUrlEncodedContent(contentList)).Result;
                if (result.IsSuccessStatusCode)
                {
                    return result.Content.ReadAsStringAsync().Result;
                }

                return null;
            }
            catch (Exception)
            {
                Console.WriteLine("Error in GET API");
                return null;
            }
        }
    }
}
