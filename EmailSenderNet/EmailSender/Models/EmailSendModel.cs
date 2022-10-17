using System.Web;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using System.Collections.Generic;

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

        [Required(AllowEmptyStrings = false)]
        [AllowHtml]
        [DisplayName("Body of Email")]
        public string Body { get; set; }

        [DisplayName("Select Recipient")]
        [Required]
        public string RecipientTemplateName { get; set; }

        [DisplayName("Select Template")]
        [Required]
        public int TemplateId { get; set; }

        public HttpPostedFileBase AttachmentFile { get; set; }

        public string GetEmailBody()
        {
            return this.Greeting + this.Body;
        }

        public IList<SelectListItem> TemplatesList { get; set; }
        public IList<SelectListItem> RecipientTemplateNameList { get; set; }

    }
}