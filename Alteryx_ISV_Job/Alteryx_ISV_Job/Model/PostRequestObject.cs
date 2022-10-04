using Newtonsoft.Json;

namespace Alteryx_ISV_Job.Model
{
    class PostRequestObject
    {
        public int Id { get; set; }

        [JsonProperty("userId")]
        public int UserId { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("body")]
        public string Body { get; set; }
    }
}
