using System.Data.SqlClient;
using System.Data.SQLite;
using System.Web.Hosting;

namespace EmailSenderApi.DAL
{
    public class BaseService
    {
        private string _connectionString = $"Data Source={HostingEnvironment.MapPath($"~/EmailSender.db")};Version=3;";
        protected string RecipientTable = "Recipients";
        protected string TemplateTable = "Templates";
        protected string EmailHistories = "EmailHistories";
        protected string EmailSignatures = "EmailSignatures";
        protected string Users = "Users";

        protected SQLiteConnection GetDbConnection()
        {
            return new SQLiteConnection(_connectionString);
        }

    }
}