import { useEffect, useState } from 'react';
import { GitHubRepository } from '../../domain/GitHubRepository';
import { GitHubRepositoryRepository } from '../../domain/GitHubRepositoryRepository';

export function useGitHubRepositories(
  repository: GitHubRepositoryRepository,
  repositoriesUrls: string[]
): { repositoryData: GitHubRepository[] } {
  const [repositoryData, setRepositoryData] = useState<GitHubRepository[]>([]);

    useEffect(() => {
      repository
        .search(repositoriesUrls)
        .then((repositoryData) => {
          setRepositoryData(repositoryData);
        });
    }, [repository, repositoriesUrls]);

    return { repositoryData };
}
