import { useEffect, useState } from 'react';

import { GitHubRepository } from '../../domain/GitHubRepository';
import { GitHubRepositoryRepository } from '../../domain/GitHubRepositoryRepository';

export function useGitHubRepositories(
  repository: GitHubRepositoryRepository,
  repositoriesUrls: string[]
): {
  repositoryData: GitHubRepository[],
  isLoading: boolean
} {
  const [repositoryData, setRepositoryData] = useState<GitHubRepository[]>([]);
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setIsLoading(true);
      repository
        .search(repositoriesUrls)
        .then((repositoryData) => {
          setRepositoryData(repositoryData);
          setIsLoading(false);
        });
    }, [repository, repositoriesUrls]);

    return { repositoryData, isLoading };
}
