import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const MatchCard = ({ name, country, experience, matchScore, matchReason, potentialCollaboration, complimentarySkills, sharedInterests, communicationCompatibility, geographicalSynergy, isExpanded, isTransitioning, onToggle, imageUrl }) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${isExpanded ? 'bg-indigo-50' : 'bg-white'}`}
      onClick={onToggle}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Avatar className="h-16 w-16">
              <AvatarImage src={imageUrl} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-indigo-700">
                {name} <span className="ml-2">{country}</span>
              </h3>
              <p className="text-sm text-gray-600">{experience}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="font-bold text-2xl text-indigo-700">{matchScore}/10</span>
            <Progress value={matchScore * 10} className="w-20 h-2 mt-1" />
          </div>
        </div>
        <motion.div
          className="overflow-hidden"
          initial={false}
          animate={{ 
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className={`mt-4 pt-4 border-t ${isTransitioning ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ExpandedSection title="Match Reason" content={matchReason} />
              <ExpandedSection title="Potential Collaboration" content={potentialCollaboration} />
              <ExpandedSection title="Complimentary Skills" content={complimentarySkills} />
              <ExpandedSection title="Shared Interests" content={sharedInterests} />
              <ExpandedSection title="Communication" content={communicationCompatibility} />
              <ExpandedSection title="Geographical Synergy" content={geographicalSynergy} />
            </div>
            <div className="mt-4 flex justify-between">
              <ExternalLinkButton text="LinkedIn Profile" variant="default" />
              <ExternalLinkButton text="Member Profile" variant="outline" />
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

const ExpandedSection = ({ title, content }) => (
  <div>
    <h4 className="font-semibold text-indigo-600 mb-1">{title}</h4>
    <p className="text-sm text-gray-700">{content}</p>
  </div>
);

const ExternalLinkButton = ({ text, variant }) => (
  <Button variant={variant} className="flex items-center">
    {text} <ExternalLink className="ml-2 h-4 w-4" />
  </Button>
);

const ExpandedSection = ({ title, content }) => (
  <div className="border p-2 rounded">
    <h4 className="font-semibold mb-1">{title}</h4>
    <p className="text-sm">{content}</p>
  </div>
);

const ExternalLinkButton = ({ text, color }) => (
  <button className={`${color} text-white px-4 py-2 rounded flex items-center justify-center w-full`}>
    {text} <ExternalLink className="ml-2 h-4 w-4" />
  </button>
);

export default MatchCard;
