import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonField = () => (
  <SkeletonTheme baseColor="#665D64" highlightColor="#A9A6A8">
    <Skeleton className="profile-form__skeletonLabel" />
    <Skeleton className="profile-form__skeletonInput" />
    <Skeleton className="profile-form__skeletonLabel" />
    <Skeleton className="profile-form__skeletonInput" />
    <Skeleton className="profile-form__skeletonLabel" />
    <Skeleton className="profile-form__skeletonInput" />
  </SkeletonTheme>
);
