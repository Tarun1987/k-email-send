using System.Web;

namespace EmailSenderApi.Models.Request
{
    public class EmailSendModel
    {
        public string Subject { get; set; }

        public string Greeting { get; set; }

        public string Body { get; set; }

        public string selectedRecipient { get; set; }

        public int selectedTemplate { get; set; }

        public string Classification { get; set; }

        public int SignatureId { get; set; }

        public string SignatureString { get; set; }

        public string AttachmentFileName { get; set; }

        public string GetEmailBody()
        {
            return this.Greeting + this.Body;
        }
    }
}