
namespace EmailSender.DbModels
{
    public class DbRecipients
    {
        public int TemplateId { get; set; }
        public string TemplateName { get; set; }
        public string ClientName { get; set; }
        public string ClientEmail { get; set; }
        public string CC { get; set; }
        public string BCC { get; set; }
    }
}