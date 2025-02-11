import { useState, useEffect } from 'react';
import formatCandidates from '../util/formatCandidate';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCandidates
  })
  return ( 
  <h1>CandidateSearch</h1>

  )
};

export default CandidateSearch;
