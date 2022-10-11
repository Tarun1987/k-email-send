
using System.Data.SqlClient;

namespace EmailSender.DAL
{
    public class BaseService
    {
        private string _connectionString = "Data Source=WIN-50GP30FGO75;Initial Catalog=Demodb;User ID=sa;Password=demol23";

        protected SqlConnection GetDbConnection()
        {
            return new SqlConnection(_connectionString);
        }

    }
}