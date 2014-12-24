﻿namespace Votenger.Domain
{
    using System.Collections.Generic;
    using Response;

    public class User
    {
        public int Id { get; set; }
        public string Nickname { get; set; }
        public ICollection<DraftResponse> DraftResponses { get; set; } 
    }
}