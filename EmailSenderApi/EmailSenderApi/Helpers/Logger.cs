using System;
using System.Web.Hosting;

namespace EmailSenderApi.Helpers
{
    public class Logger
    {
        public static void Log(string message)
        {
            var currentTime = DateTime.Now;
            var fileName = $"log_{currentTime.Year}_{currentTime.Month}_{currentTime.Day}_{currentTime.Hour}.txt";
            var filePath = HostingEnvironment.MapPath($"~/Content/{fileName}");

            var formattedMessage = $"Log: ${currentTime} :: {message}" + Environment.NewLine;
            if (System.IO.File.Exists(filePath))
                System.IO.File.AppendAllText(filePath, formattedMessage);
            else
                System.IO.File.WriteAllText(filePath, formattedMessage);

        }

    }
}