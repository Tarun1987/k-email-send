using System;

namespace EmailSenderApi.Models.Response
{
    public class History
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public string Html { get; set; }
        public string RecipientTemplateName { get; set; }
        public string UniqueId { get; set; }
        public DateTime SendAt { get; set; }

        public string FormattedSendAt
        {
            get
            {
                var dateFormat = "dd-MM-yyyy HH:mm:ss";

                if (SendAt == null) return DateTime.Now.ToString(dateFormat);
                return SendAt.ToString(dateFormat);
            }
        }

        public string SendAtDbFormat
        {
            get
            {
                return SendAt.ToString("yyyy-MM-dd HH:mm:ss");
            }
        }
    }
}