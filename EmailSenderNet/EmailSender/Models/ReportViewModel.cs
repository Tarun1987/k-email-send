using System;

namespace EmailSender.Models
{
    public class ReportViewModel
    {
        public DateTime CreatedDate { get; set; }
        public string FileName { get; set; }
        public int FailedCount { get; set; }
        public int DeliveredCount { get; set; }
        public int PendingCount { get; set; }
    }
}