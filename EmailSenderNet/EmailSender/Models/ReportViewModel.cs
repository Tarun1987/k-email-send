using EmailSender.DbModels;
using System.Collections.Generic;

namespace EmailSender.Models
{
    public class ReportViewModel
    {
        public PaginationModel PaginationModel { get; set; }
        public IList<EmailHistory> EmailHistoryList { get; set; }
    }
}