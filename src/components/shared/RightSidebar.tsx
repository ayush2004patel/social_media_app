import React from 'react';
import { useLocation } from 'react-router-dom';
import TopCreators from './TopCreators';
import { useGetTopCreators } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';

const RightSidebar: React.FC = () => {
  const { pathname } = useLocation();

  // Early return if the current path is not the home page
  if (pathname !== '/') return null;

  const { data: creators, isPending: isCreatorsLoading } = useGetTopCreators();

  return (
    <nav className="rightsidebar custom-scrollbar">
      {isCreatorsLoading ? (
        <LoadingState />
      ) : (
        <Content creators={creators?.documents} />
      )}
    </nav>
  );
};

const LoadingState: React.FC = () => (
  <div>
    <div className="w-full flex items-start mb-10">
      <div className="animate-pulse rounded-md bg-muted w-1/2 py-3 bg-slate-600" />
    </div>
    <div className="grid xl:grid-cols-2 lg:grid-cols-1 gap-4">
      {Array.from({ length: 7 }, (_, index) => (
        <div key={index} className="h-40 w-52 bg-slate-500 animate-pulse rounded-md bg-muted" />
      ))}
    </div>
  </div>
);

interface ContentProps {
  creators?: Models.Document[];
}

const Content: React.FC<ContentProps> = ({ creators }) => (
  <>
    <h2 className="h3-bold md:h2-bold w-full mb-10">Top Creators</h2>
    <div className="grid xl:grid-cols-2 lg:grid-cols-1 gap-4">
      {creators?.map((creator: Models.Document) => (
        <TopCreators key={creator.$id} creator={creator} />
      ))}
    </div>
  </>
);

export default RightSidebar;
