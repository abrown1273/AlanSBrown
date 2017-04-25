using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AlanSBrown.Controllers
{
    public class HomeController : Controller
    {
        ILogger _log;
        public HomeController(ILogger<HomeController> log)
        {
            _log = log;
        }
        public IActionResult Index()
        {
            //_log.LogCritical("This is a test of the logging process.");
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
