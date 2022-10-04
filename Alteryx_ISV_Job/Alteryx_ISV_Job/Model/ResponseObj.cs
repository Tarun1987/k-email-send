using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Alteryx_ISV_Job.Model
{
    class ResponseObj
    {
        //[JsonProperty("id")]
        //public int Id { get; set; }

        //[JsonProperty("bondId")]
        //public int BondId { get; set; }

        //[JsonProperty("label")]
        //public string Label { get; set; }

        //[JsonProperty("value")]
        //public string Value { get; set; }

        //[JsonProperty("updatedBy")]
        //public string UpdatedBy { get; set; }

        //[JsonProperty("lastUpdated")]
        //public DateTime LastUpdated { get; set; }

        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("userId")]
        public int UserId { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("body")]
        public string Body { get; set; }
    }
}
