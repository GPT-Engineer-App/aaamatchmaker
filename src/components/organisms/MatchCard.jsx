import { ExternalLink, Briefcase, MapPin, Star, Zap, Users, Globe, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const MatchCard = ({ name, country, experience, matchScore, matchReason, potentialCollaboration, complimentarySkills, sharedInterests, communicationCompatibility, geographicalSynergy, isExpanded, isTransitioning, onToggle, imageUrl }) => {
  const ExpandedSection = ({ title, content, icon }) => (
    <div className="border p-4 rounded-lg bg-white shadow-sm">
      <h4 className="font-semibold mb-2 flex items-center text-gray-700">
        {icon}
        <span className="ml-2">{title}</span>
      </h4>
      <p className="text-sm text-gray-600">{content}</p>
    </div>
  );

  const ExternalLinkButton = ({ text, color }) => (
    <button className={`${color} text-white px-4 py-2 rounded flex items-center justify-center w-full`}>
      {text} <ExternalLink className="ml-2 h-4 w-4" />
    </button>
  );

  return (
    <motion.div 
      className={`border rounded-lg p-6 cursor-pointer transition-all duration-300 hover-lift ${isExpanded ? 'bg-gradient-to-r from-blue-50 to-purple-50' : 'bg-white'}`}
      onClick={onToggle}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div className="flex items-center mb-2 sm:mb-0">
          <Avatar className="h-16 w-16 border-2 border-blue-300">
            <AvatarImage src={imageUrl} alt={name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {name} <span className="ml-2 text-gray-500">{country}</span>
            </h3>
            <p className="text-sm text-gray-600 flex items-center">
              <Briefcase className="w-4 h-4 mr-1" /> {experience}
            </p>
          </div>
        </div>
        <div className="text-left sm:text-right mt-2 sm:mt-0">
          <span className="font-bold text-2xl text-blue-600">{matchScore}/10</span>
          <p className="text-sm text-gray-600 flex items-center justify-end">
            <Star className="w-4 h-4 mr-1 text-yellow-400" /> Match Score
          </p>
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
            <ExpandedSection title="Match Reason Summary" content={matchReason} icon={<Zap className="w-5 h-5 text-yellow-500" />} />
            <ExpandedSection title="Potential Collaboration" content={potentialCollaboration} icon={<Users className="w-5 h-5 text-green-500" />} />
            <ExpandedSection title="Complimentary Skills" content={complimentarySkills} icon={<Star className="w-5 h-5 text-purple-500" />} />
            <ExpandedSection title="Shared Interests" content={sharedInterests} icon={<Heart className="w-5 h-5 text-red-500" />} />
            <ExpandedSection title="Communication Compatibility" content={communicationCompatibility} icon={<MessageCircle className="w-5 h-5 text-blue-500" />} />
            <ExpandedSection title="Geographical Synergy" content={geographicalSynergy} icon={<Globe className="w-5 h-5 text-indigo-500" />} />
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ExternalLinkButton text="LinkedIn Profile" color="bg-blue-500" />
            <ExternalLinkButton text="Member Profile" color="bg-pink-500" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MatchCard;
