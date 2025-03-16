import { config } from '../../devdash_config';
import { GitHubRepositoryRepository } from '../../domain/GitHubRepositoryRepository';
import styles from "./Dashboard.module.scss";
import Brand from "./brand.svg";
import { GitHubRepositoryWidget } from './GitHubRepositoryWidget';
import { useGitHubRepositories } from './useGitHubRepositories';

const gitHubRepositoryUrls = config.widgets.map((widget) => widget.repository_url);

export function Dashboard({ repository }: { repository: GitHubRepositoryRepository }) {
  const { repositoryData } = useGitHubRepositories(repository, gitHubRepositoryUrls);

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
            <GitHubRepositoryWidget
              key={`${widget.id.organization}/${widget.id.name}`}
              widget={widget}
            />
          ))}
        </section>
      )}
    </>
  );
}
