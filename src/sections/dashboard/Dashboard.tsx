import { useEffect, useState } from 'react';

import { config } from '../../devdash_config';
import { GitHubRepository } from '../../domain/GitHubRepository';
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

export function Dashboard() {
  const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);
  const [repositoryData, setRepositoryData] = useState<GitHubRepository[]>([]);

  useEffect(() => {
    repository
      .search(config.widgets.map((widget) => widget.repository_url))
      .then((repositoryData) => {
        setRepositoryData(repositoryData);
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
            <article className={styles.widget} key={`${widget.id.organization}/${widget.id.name}`}>
              <header className={styles.widget__header}>
                <h2 className={styles.widget__title}>
                  <a
                    href={widget.url}
                    target="_blank"
                    title={`${widget.id.organization}/${widget.id.name}`}
                    rel="noreferrer"
                  >
                    {widget.id.organization}/{widget.id.name}
                  </a>
                </h2>
                {widget.private ? <img src={Lock} alt='' /> : <img src={Unlock} alt='' />}
              </header>
              <div className={styles.widget__body}>
                <div className={styles.widget__status}>
                  <p>Last update {isoToReadableDate(widget.updatedAt)}</p>
                  {widget.hasWorkflows && (
                    <div>
                      {widget.isLastWorkflowSuccess ? (
                        <img src={Check} alt='' />
                      ) : (
                        <img src={Error} alt='' />
                      )}
                    </div>
                  )}
                </div>
                <p className={styles.widget__description}>{widget.description}</p>
              </div>
              <footer className={styles.widget__footer}>
                <div className={styles.widget__stat}>
                  <img src={Start} alt='' />
                  <span>{widget.stars}</span>
                </div>
                <div className={styles.widget__stat}>
                  <img src={Watchers} alt='' />
                  <span>{widget.watchers}</span>
                </div>
                <div className={styles.widget__stat}>
                  <img src={Forks} alt='' />
                  <span>{widget.forks}</span>
                </div>
                <div className={styles.widget__stat}>
                  <img src={IssueOpened} alt='' />
                  <span>{widget.issues}</span>
                </div>
                <div className={styles.widget__stat}>
                  <img src={PullRequests} alt='' />
                  <span>{widget.pullRequests}</span>
                </div>
              </footer>
            </article>
          ))}
        </section>
      )}
    </>
  );
}
