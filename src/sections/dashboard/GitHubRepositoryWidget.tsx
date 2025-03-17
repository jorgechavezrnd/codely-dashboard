import { Link } from "react-router-dom";

import Check from "../../assets/svgs/check.svg";
import Error from "../../assets/svgs/error.svg";
import PullRequests from "../../assets/svgs/git-pull-request.svg";
import IssueOpened from "../../assets/svgs/issue-opened.svg";
import Lock from "../../assets/svgs/lock.svg";
import Forks from "../../assets/svgs/repo-forked.svg";
import Start from "../../assets/svgs/star.svg";
import Unlock from "../../assets/svgs/unlock.svg";
import Watchers from "../../assets/svgs/watchers.svg";
import { GitHubRepository } from "../../domain/GitHubRepository";
import styles from "./GitHubRepositoryWidget.module.scss";

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

export function GitHubRepositoryWidget({ widget }: { widget: GitHubRepository }) {
	return (
		<article className={styles.widget} key={`${widget.id.organization}/${widget.id.name}`}>
			<header className={styles.widget__header}>
				<h2 className={styles.widget__title}>
					<Link to={`/repository/${widget.id.organization}/${widget.id.name}`}>
						{widget.id.organization}/{widget.id.name}
					</Link>
				</h2>
				{widget.private ? <img src={Lock} alt="" /> : <img src={Unlock} alt="" />}
			</header>
			<div className={styles.widget__body}>
				<div className={styles.widget__status}>
					<p>Last update {isoToReadableDate(widget.updatedAt)}</p>
					{widget.hasWorkflows && (
						<div>
							{widget.isLastWorkflowSuccess ? (
								<img src={Check} alt="" />
							) : (
								<img src={Error} alt="" />
							)}
						</div>
					)}
				</div>
				<p className={styles.widget__description}>{widget.description}</p>
			</div>
			<footer className={styles.widget__footer}>
				<div className={styles.widget__stat}>
					<img src={Start} alt="" />
					<span>{widget.stars}</span>
				</div>
				<div className={styles.widget__stat}>
					<img src={Watchers} alt="" />
					<span>{widget.watchers}</span>
				</div>
				<div className={styles.widget__stat}>
					<img src={Forks} alt="" />
					<span>{widget.forks}</span>
				</div>
				<div className={styles.widget__stat}>
					<img src={IssueOpened} alt="" />
					<span>{widget.issues}</span>
				</div>
				<div className={styles.widget__stat}>
					<img src={PullRequests} alt="" />
					<span>{widget.pullRequests}</span>
				</div>
			</footer>
		</article>
	);
}
