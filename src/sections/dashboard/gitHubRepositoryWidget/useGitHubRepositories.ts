import { useEffect, useState } from "react";

import { GitHubRepository } from "../../../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "../../../domain/GitHubRepositoryRepository";

export function useGitHubRepositories(
	repository: GitHubRepositoryRepository,
	repositoriesUrls: string[]
): {
	gitHubRepositories: GitHubRepository[];
	isLoading: boolean;
} {
	const [gitHubRepositories, setGitHubRepositories] = useState<GitHubRepository[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		repository.search(repositoriesUrls).then((repositoryData) => {
			setGitHubRepositories(repositoryData);
			setIsLoading(false);
		});
	}, [repository, repositoriesUrls]);

	return { gitHubRepositories, isLoading };
}
