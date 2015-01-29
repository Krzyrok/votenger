﻿namespace Votenger.Infrastructure
{
    using System.Linq;
    using Domain;
    using Domain.Game;
    using Domain.Session;
    using Web.DTO;

    public class DtoFactory
    {
        public static VotingSessionDto CreateVotingSessionDto(VotingSession votingSession, User user)
        {
            return new VotingSessionDto
            {
                Id = votingSession.Id,
                Status = votingSession.Status.ToString(),
                Author = votingSession.Author.Login,
                Category = votingSession.Category,
                NumberOfVotengers = votingSession.NumberOfVotengers,
                DraftsPerVotenger = votingSession.DraftsPerVotenger,
                StartDate = votingSession.StartDate,
                EndDate = votingSession.EndDate,
                IsAuthor = votingSession.Author.Id == user.Id,
                DraftAlreadyDoneByUser = votingSession.DraftResults.Any(dr => dr.UserId == user.Id),
                VoteAlreadyDoneByUser = votingSession.VoteResults.Any(vr => vr.UserId == user.Id),
            };
        }

        public static GameDto CreateGameDto(Game game)
        {
            return new GameDto
            {
                Id = game.Id,
                Name = game.Name,
                Type = game.Type,
                Genre = game.Genre,
                MaxPlayers = game.MaxPlayers,
            };
        }
    }
}
