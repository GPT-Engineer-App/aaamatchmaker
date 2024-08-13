import { useState, useEffect } from "react";
import MatchCard from "./MatchCard";

const MatchList = ({ matches }) => {
  const [expandedMatchIndex, setExpandedMatchIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleExpand = (index) => {
    setIsTransitioning(true);
    setExpandedMatchIndex((prevIndex) => {
      if (prevIndex === index) {
        return null; // Collapse if already expanded
      }
      return index; // Expand the clicked match
    });
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Match this with the CSS transition duration
  };

  useEffect(() => {
    // Set the first match as expanded initially
    setExpandedMatchIndex(0);
  }, []);

  return (
    <div className="space-y-4">
      {matches.map((match, index) => (
        <MatchCard 
          key={index} 
          {...match}
          isExpanded={index === expandedMatchIndex}
          isTransitioning={isTransitioning}
          onToggle={() => handleExpand(index)}
          matchReason={match.matchReason || "Match reason not provided"}
          potentialCollaboration={match.potentialCollaboration || "Potential collaboration not specified"}
          complimentarySkills={match.complimentarySkills || "Complimentary skills not listed"}
          sharedInterests={match.sharedInterests || "Shared interests not provided"}
          communicationCompatibility={match.communicationCompatibility || "Communication compatibility not specified"}
          geographicalSynergy={match.geographicalSynergy || "Geographical synergy not provided"}
        />
      ))}
    </div>
  );
};

export default MatchList;
