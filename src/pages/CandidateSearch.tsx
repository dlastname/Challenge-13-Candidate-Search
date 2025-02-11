import { useState, useEffect } from "react";
import formatCandidates from "../util/formatCandidate";
import Candidate from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCandidates = async () => {
      const formattedCandidates = await formatCandidates();
      setCandidates(formattedCandidates);
    };
    fetchCandidates();
  }, []);

  const handleLike = () => {
    console.log("Liked: ", candidates[currentIndex]);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleDislike = () => {
    console.log("Disliked: ", candidates[currentIndex]);
    setCurrentIndex((prev) => prev + 1);
  };

  if (candidates.length === 0) {
    console.log(`Candidates returned no length`);
  }

  const currentCandidate = candidates[currentIndex];

  return (
    <div>
      <h1>CandidateSearch</h1>
      <div className="test">
        <img
          src={currentCandidate.avatar_url}
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
        {/* Actions */}
        <button onClick={handleDislike}>❌</button>
        <button onClick={handleLike}>➕</button>
      </div>
    </div>
  );
};

export default CandidateSearch;
