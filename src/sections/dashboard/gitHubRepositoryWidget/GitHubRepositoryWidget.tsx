import { Link } from "react-router-dom";

import Check from "../../../assets/svgs/check.svg";
import Error from "../../../assets/svgs/error.svg";
import PullRequests from "../../../assets/svgs/git-pull-request.svg";
import IssueOpened from "../../../assets/svgs/issue-opened.svg";
import Lock from "../../../assets/svgs/lock.svg";
import Forks from "../../../assets/svgs/repo-forked.svg";
import Start from "../../../assets/svgs/star.svg";
import Unlock from "../../../assets/svgs/unlock.svg";
import Watchers from "../../../assets/svgs/watchers.svg";
import { GitHubRepository } from "../../../domain/GitHubRepository";
import styles from "../repositoryWidget/RepositoryWidget.module.scss";

const isoToReadableDate = (lastUpdateDate: Date): string => {
	const currentDate = new Date();
	const diffTime = currentDate.getTime() - lastUpdateDate.getTime();
	const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

	if (diffDays === 0) {
		return "today";
	}

	if (diffDays > 30) {
		return "more than a month ago";
	}

	return `${diffDays} days ago`;
};

export function GitHubRepositoryWidget({ repository }: { repository: GitHubRepository }) {
	return (
		<article className={styles.widget} key={`${repository.id.organization}/${repository.id.name}`}>
			<header className={styles.widget__header}>
				<h2 className={styles.widget__title}>
					<Link to={`/repository/${repository.id.organization}/${repository.id.name}`}>
						{repository.id.organization}/{repository.id.name}
					</Link>
				</h2>
				{repository.private ? <img src={Lock} alt="" /> : <img src={Unlock} alt="" />}
			</header>
			<div className={styles.widget__body}>
				<div className={styles.widget__status}>
					<p>Last update {isoToReadableDate(repository.updatedAt)}</p>
					{repository.hasWorkflows && (
						<div>
							{repository.isLastWorkflowSuccess ? (
								<img src={Check} alt="" />
							) : (
								<img src={Error} alt="" />
							)}
						</div>
					)}
				</div>
				<p className={styles.widget__description}>{repository.description}</p>
			</div>
			<footer className={styles.widget__footer}>
				<div className={styles.widget__stat}>
					<img src={Start} alt="" />
					<span>{repository.stars}</span>
				</div>
				<div className={styles.widget__stat}>
					<img src={Watchers} alt="" />
					<span>{repository.watchers}</span>
				</div>
				<div className={styles.widget__stat}>
					<img src={Forks} alt="" />
					<span>{repository.forks}</span>
				</div>
				<div className={styles.widget__stat}>
					<img src={IssueOpened} alt="" />
					<span>{repository.issues}</span>
				</div>
				<div className={styles.widget__stat}>
					<img src={PullRequests} alt="" />
					<span>{repository.pullRequests}</span>
				</div>
			</footer>
		</article>
	);
}
