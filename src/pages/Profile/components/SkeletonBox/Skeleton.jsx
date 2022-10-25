import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonBox = () => (
  <SkeletonTheme baseColor="#665D64" highlightColor="#A9A6A8">
    <Skeleton className="skeletonLabel" />
    <Skeleton className="skeletonInput" />
    <Skeleton className="skeletonLabel" />
    <Skeleton className="skeletonInput" />
    <Skeleton className="skeletonLabel" />
    <Skeleton className="skeletonInput" />
  </SkeletonTheme>
);
