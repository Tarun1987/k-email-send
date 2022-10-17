using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace EmailSender.Models
{
    public class MasterRecipientViewModel
    {
        [Required]
        public HttpPostedFileBase MasterFile { get; set; }

        public IList<string> RecipientTemplateNameList { get; set; }
    }
}