using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoLink.Model;
using AutoLink.ViewModel;
using Npgsql;

namespace AutoLink.Service
{
    public class SignUpService
    {
        HttpClient httpClient;
        public SignUpService()
        {
            httpClient = new HttpClient { BaseAddress = new Uri("https://localhost:7270") };

        }


    }
}
