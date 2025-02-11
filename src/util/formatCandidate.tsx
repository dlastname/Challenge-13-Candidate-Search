import React, { useEffect, useState } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import Candidate from "../interfaces/Candidate.interface";

const formatCandidates = async () => {
  try {
    const rawData = await searchGithub();

    // take rawData and format it
    const formattedCandidates: Candidate[] = rawData.map((user: any) => ({
      login: user.login,
      name: user.name || null,
      location: user.location || null,
      avatar_url: user.avatar_url,
      email: user.email || null,
      html_url: user.html_url,
      company: user.company || null,
    }));
    return formattedCandidates;
  } catch (error) {
    console.error("Error formatting candidates:", error);
    return [];
  }
};
export default formatCandidates;
