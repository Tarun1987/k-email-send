using EmailSender.DbModels;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace EmailSender.Models
{
    public class TemplateViewModel
    {
        [Required]
        public HttpPostedFileBase MasterFile { get; set; }

        public IList<DbTemplates> TemplateList { get; set; }

        public int LoggedInUserId { get; set; }

    }
}