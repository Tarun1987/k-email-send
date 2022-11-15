using System.ComponentModel.DataAnnotations;

namespace EmailSenderApi.Models.Request
{
    public class SignatureModel
    {
        public int LoggedInUserId { get; set; }

        public int? SignatureId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Body { get; set; }
    }
}