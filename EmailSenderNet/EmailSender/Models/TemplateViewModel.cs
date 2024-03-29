﻿using EmailSender.DbModels;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Web;
using System.Web.Mvc;

namespace EmailSender.Models
{
    public class TemplateViewModel
    {
        public IList<DbTemplates> TemplateList { get; set; }

        public int LoggedInUserId { get; set; }

        public int? TemplateId { get; set; }

        [Required]
        [DisplayName("Template Name")]
        public string Name { get; set; }

        [Required]
        [AllowHtml]
        [DisplayName("Template Body")]
        public string Body { get; set; }

    }
}