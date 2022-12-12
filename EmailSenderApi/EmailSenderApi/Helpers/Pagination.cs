namespace EmailSenderApi.Helpers
{
    public class Pagination
    {
        public static string GetLimitOffsetString(int page = 1, int limit = 10)
        {
            return $"LIMIT {(page > 1 ? page - 1 : 0) * limit}, {limit}";
        }
    }
}