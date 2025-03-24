import { Router } from "./Router";
import { RepositoryWidgetContextProvider } from "./sections/dashboard/repositoryWidget/RepositoryWidgetContextProvider";

export function App() {
	return (
		<RepositoryWidgetContextProvider>
			<Router />
		</RepositoryWidgetContextProvider>
	);
}
