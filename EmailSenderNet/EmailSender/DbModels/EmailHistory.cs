using System;

namespace EmailSender.DbModels
{
    public class EmailHistory
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
                var dateFormat = "yyyy-MM-dd";

                if (SendAt == null) return DateTime.Now.ToString(dateFormat);
                return SendAt.ToString(dateFormat);
            }
        }
    }
}