using System;

namespace Alteryx_ISV_Job.Helper
{
    class Logger
    {
        public static void Log(string message)
        {
            // TODO write logs in file.
            Console.WriteLine(message);
        }

        public static void LogProcess(int processId, bool completed = false)
        {
            Log($"--------- Step ${processId}: ${(completed ? "Completed" : "Started")} ---------");
        }
    }
}
