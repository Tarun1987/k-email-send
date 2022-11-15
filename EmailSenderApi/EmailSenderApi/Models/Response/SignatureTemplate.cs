namespace EmailSenderApi.Models.Response
{
    public class SignatureTemplate
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Html { get; set; }
        public int OwnerId { get; set; }
        public int LoggedInUserId { get; set; }
        public bool Share { get; set; }
        public bool IsEditable { get { return OwnerId == LoggedInUserId; } }
    }
}