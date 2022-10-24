namespace EmailSender.DbModels
{
    public class EmailSignatures
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Html { get; set; }
        public int OwnerId { get; set; }
        public bool Share { get; set; }
    }
}