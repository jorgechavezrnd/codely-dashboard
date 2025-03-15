import { useEffect, useState } from 'react';

import { config } from '../../devdash_config';
import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GitHubApiGitHubRepositoryRepository";
import styles from "./Dashboard.module.scss";
import Brand from "./brand.svg";
import Check from "./check.svg";
import Error from "./error.svg";
import PullRequests from "./git-pull-request.svg";
import IssueOpened from "./issue-opened.svg";
import Lock from "./lock.svg";
import Forks from "./repo-forked.svg";
import Start from "./star.svg";
import Unlock from "./unlock.svg";
import Watchers from "./watchers.svg";
import { GitHubApiResponses } from '../../infrastructure/GitHubApiResponse';

const isoToReadableDate = (lastUpdate: string): string => {
  const lastUpdateDate = new Date(lastUpdate);
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

export function Dashboard() {
  const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);
  const [repositoryData, setGithubApiResponse] = useState<GitHubApiResponses[]>([]);

  useEffect(() => {
    repository.search(config.widgets.map((widget) => widget.repository_url)).then((responses) => {
      setGithubApiResponse(responses);
    });
  }, []);

  return (
    <>
      <header className={styles.header}>
        <section className={styles.header__container}>
          <img src={Brand} alt='' />
          <h1 className={styles.app__brand}>DevDash_</h1>
        </section>
      </header>
      {repositoryData.length === 0 ? (
        <div className={styles.empty}>
          <span>No hay widgets configurados.</span>
        </div>
      ): (
        <section className={styles.container}>
          {repositoryData.map((widget) => (
            <article className={styles.widget} key={widget.repositoryData.id}>
              <header className={styles.widget__header}>
                <h2 className={styles.widget__title}>
                  <a
                    href={widget.repositoryData.html_url}
                    target="_blank"
                    title={`${widget.repositoryData.organization.login}/${widget.repositoryData.name}`}
                    rel="noreferrer"
                  >
                    {widget.repositoryData.organization.login}/{widget.repositoryData.name}
                  </a>
                </h2>
                {widget.repositoryData.private ? <img src={Lock} alt='' /> : <img src={Unlock} alt='' />}
              </header>
              <div className={styles.widget__body}>
                <div className={styles.widget__status}>
                  <p>Last update {isoToReadableDate(widget.repositoryData.updated_at)}</p>
                  {widget.ciStatus.workflow_runs.length > 0 && (
                    <div>
                      {widget.ciStatus.workflow_runs[0].status === "completed" ? (
                        <img src={Check} alt='' />
                      ) : (
                        <img src={Error} alt='' />
                      )}
                    </div>
                  )}
                </div>
                <p className={styles.widget__description}>{widget.repositoryData.description}</p>
              </div>
              <footer className={styles.widget__footer}>
                <div className={styles.widget__stat}>
                  <img src={Start} alt='' />
                  <span>{widget.repositoryData.stargazers_count}</span>
                </div>
                <div className={styles.widget__stat}>
                  <img src={Watchers} alt='' />
                  <span>{widget.repositoryData.watchers_count}</span>
                </div>
                <div className={styles.widget__stat}>
                  <img src={Forks} alt='' />
                  <span>{widget.repositoryData.forks_count}</span>
                </div>
                <div className={styles.widget__stat}>
                  <img src={IssueOpened} alt='' />
                  <span>{widget.repositoryData.open_issues_count}</span>
                </div>
                <div className={styles.widget__stat}>
                  <img src={PullRequests} alt='' />
                  <span>{widget.pullRequests.length}</span>
                </div>
              </footer>
            </article>
          ))}
        </section>
      )}
    </>
  );
}
