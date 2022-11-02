namespace EmailSender.Helpers
{
    public class PaginationHelper
    {
        public static string GetLimitOffsetString(int page = 1, int limit = 10)
        {
            return $"OFFSET {(page > 1 ? page - 1 : 0) * limit} ROWS FETCH NEXT {limit} ROWS ONLY";
        }
    }
}