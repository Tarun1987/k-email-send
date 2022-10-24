using EmailSender.DbModels;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace EmailSender.Models
{
    public class SignatureViewModel
    {
        public IList<EmailSignatures> SignatureList { get; set; }

        public int LoggedInUserId { get; set; }

        public int? SignatureId { get; set; }

        [Required]
        [DisplayName("Signature Name")]
        public string Name { get; set; }

        [Required]
        [AllowHtml]
        [DisplayName("Signature Body")]
        public string Body { get; set; }

    }
}