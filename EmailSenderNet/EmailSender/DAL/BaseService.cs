﻿
using System.Data.SqlClient;

namespace EmailSender.DAL
{
    public class BaseService
    {
        private string _connectionString = "Data Source=localhost;Initial Catalog=EmailSender;User ID=sa;Password=Passw0rd";
        protected string RecipientTable = "Recipients";
        protected string TemplateTable = "Templates";
        protected string EmailHistories = "EmailHistories";
        protected string EmailSignatures = "EmailSignatures";
        protected string Users = "Users";

        protected SqlConnection GetDbConnection()
        {
            return new SqlConnection(_connectionString);
        }

    }
}