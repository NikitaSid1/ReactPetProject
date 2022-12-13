import * as React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

export const TodoSkeleton = () => (
  <div data-testid="skeleton">
    <SkeletonTheme baseColor="#665D64" highlightColor="#A9A6A8">
      <Skeleton className="todo-form__skeleton" />
      <Skeleton className="todo-form__skeleton" />
      <Skeleton className="todo-form__skeleton" />
      <Skeleton className="todo-form__skeleton" />
      <Skeleton className="todo-form__skeleton" />
    </SkeletonTheme>
  </div>
);
