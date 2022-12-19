namespace EmailSenderApi.Models.Response
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public bool AllowAccess { get; set; }

        public string GetName()
        {
            return $"{Name} {LastName}";
        }
    }
}