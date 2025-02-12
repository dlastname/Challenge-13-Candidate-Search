import { useState, useEffect } from "react";
import formatCandidates from "../util/formatCandidate";
import Candidate from "../interfaces/Candidate.interface";
import { searchGithubUser } from "../api/API";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>();
  const [likedCandidates, setLikedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      const formattedCandidates = await formatCandidates();
      setCandidates(formattedCandidates);

      // Fetch first candidate's details from GitHub
      if (formattedCandidates.length > 0) {
        const data = await searchGithubUser(formattedCandidates[0].login);
        setCurrentCandidate(data);
      }
    };

    fetchCandidates();

    // Load liked candidates from localStorage
    const storedLikes = localStorage.getItem("likedCandidates");
    if (storedLikes) {
      setLikedCandidates(JSON.parse(storedLikes));
    }
  }, []);

  useEffect(() => {
    if (candidates.length > 0 && currentIndex < candidates.length) {
      setCurrentCandidate(candidates[currentIndex]);
    }
  }, [currentIndex, candidates]);

  const handleLike = () => {
    if (currentCandidate) {
      const updatedLikes = [...likedCandidates, currentCandidate];
      setLikedCandidates(updatedLikes);
      localStorage.setItem("likedCandidates", JSON.stringify(updatedLikes));
      console.log("Liked: ", currentCandidate);
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const handleDislike = () => {
    console.log("Disliked: ", currentCandidate);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="candidates">
      <h1>Candidate Search</h1>
      {currentCandidate ? (
        <>
          <div className="candidate-options">
            <img
              src={
                currentCandidate.avatar_url ||
                "https://octodex.github.com/images/orderedlistocat.png"
              }
              alt={`The avatar image of ${currentCandidate.login}`}
            />
            <h2>
              {currentCandidate.name
                ? `${currentCandidate.login} (${currentCandidate.name})`
                : currentCandidate.login}
            </h2>
            <p>Location: {currentCandidate.location || "Unavailable"}</p>
            <p>Email: {currentCandidate.email || "Unavailable"}</p>
            <p>Company: {currentCandidate.company || "Unavailable"}</p>
            <a
              href={currentCandidate.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Profile
            </a>
          </div>
          <div className="actions">
            <button onClick={handleDislike}>❌</button>
            <button onClick={handleLike}>➕</button>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default CandidateSearch;
