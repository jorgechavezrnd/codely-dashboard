import { githubApiResponses } from "../../github_api_responses";
import styles from "./Dashboard.module.scss";
import Brand from "./brand.svg?react";
import Check from "./check.svg?react";
import Error from "./error.svg?react";
import PullRequest from "./git-pull-request.svg?react";
import IssueOpened from "./issue-opened.svg?react";
import Lock from "./lock.svg?react";
import Forks from "./repo-forked.svg?react";
import Start from "./star.svg?react";
import Unlock from "./unlock.svg?react";
import Watchers from "./watchers.svg?react";

const isoToReadableDate = (lastUpdate: string): string => {
  const lastUpdateDate = new Date(lastUpdate);
  const currentDate = new Date();
  const diffDays = currentDate.getDate() - lastUpdateDate.getDate();

  if (diffDays === 0) {
    return "today";
  }

  if (diffDays > 30) {
    return "more than a month ago";
  }

  return `${diffDays} days ago`;
};

export function Dashboard() {
  return (
    <>
      <header className={styles.container}>
        <section className={styles.header__container}>
          <Brand />
          <h1 className={styles.app__brand}>DevDash_</h1>
        </section>
      </header>
      <section className={styles.container}>
        {githubApiResponses.map((widget) => (
          <article className={styles.widget} key={widget.repositoryData.id}>
            <header className={styles.widget__header}>
              <a
                className={styles.widget__title}
                href={widget.repositoryData.html_url}
                target="_blank"
                title={`${widget.repositoryData.organization.login}/${widget.repositoryData.name}`}
                rel="noreferrer"
              >
                {widget.repositoryData.organization.login}/{widget.repositoryData.name}
              </a>
              {widget.repositoryData.private ? <Lock /> : <Unlock />}
            </header>
            <div className={styles.widget__body}>
              <div className={styles.widget_status}>
                <p>Last update {isoToReadableDate(widget.repositoryData.updated_at)}</p>
                {widget.ciStatus.workflow_runs.length > 0 && (
                  <div>
                    {widget.ciStatus.workflow_runs[0].status === "completed" ? (
                      <Check />
                    ) : (
                      <Error />
                    )}
                  </div>
                )}
              </div>
              <p className={styles.widget__description}>{widget.repositoryData.description}</p>
            </div>
            <footer className={styles.widget__footer}>
              <div className={styles.widget__stat}>
                <Start />
                <span>{widget.repositoryData.stargazers_count}</span>
              </div>
              <div className={styles.widget__stat}>
                <Watchers />
                <span>{widget.repositoryData.watchers_count}</span>
              </div>
              <div className={styles.widget__stat}>
                <Forks />
                <span>{widget.repositoryData.forks_count}</span>
              </div>
              <div className={styles.widget__stat}>
                <IssueOpened />
                <span>{widget.repositoryData.open_issues_count}</span>
              </div>
              <div className={styles.widget__stat}>
                <PullRequest />
                <span>{widget.pullRequest.length}</span>
              </div>
            </footer>
          </article>
        ))}
      </section>
    </>
  );
}
