using System.Web;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace EmailSender.Models
{
    public class EmailSendModel
    {

        [Required]
        [DisplayName("Email Subject")]
        public string Subject { get; set; }

        [Required]
        [DisplayName("Greetings")]
        public string Greeting { get; set; }

        [DisplayName("Attachments")]
        public string AttachmentPath { get; set; }

        [Required]
        [AllowHtml]
        [DisplayName("Body of Email")]
        public string Body { get; set; }

        [DisplayName("Upload  a file with list of recipients.")]
        public string RecipientPath { get; set; }

        public HttpPostedFileBase AttachmentFile { get; set; }
        public HttpPostedFileBase RecipientFile { get; set; }


        public string GetEmailBody()
        {
            return this.Greeting + this.Body;
        }

    }
}