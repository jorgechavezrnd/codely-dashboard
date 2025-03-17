import { RepositoryId } from "./GitHubRepository";
import { GitHubRepositoryPullRequest } from "./GitHubRepositoryPullRequest";

export interface GitHubRepositoryPullRequestRepository {
	search(RepositoryId: RepositoryId): Promise<GitHubRepositoryPullRequest[]>;
}
