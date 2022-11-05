namespace EmailSender.DbModels
{
    public class Users
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool AllowAccess { get; set; }
    }
}