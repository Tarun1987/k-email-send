namespace EmailSender.Models
{
    public class PaginationModel
    {
        public PaginationModel() { }

        public PaginationModel(int currentPage, int totalRecords, int limit)
        {
            this.CurrentPage = currentPage;
            this.TotalRecords = totalRecords;
            this.PageSize = limit;
        }

        public int TotalPages
        {
            get
            {
                var totalPages = TotalRecords / PageSize;
                if (TotalRecords % PageSize > 0)
                    totalPages++;

                return totalPages;
            }
        }
        public int PageSize { get; set; }
        public int TotalRecords { get; set; }
        public int CurrentPage { get; set; }
        public string Controller { get; set; }
        public string Action { get; set; }
    }
}