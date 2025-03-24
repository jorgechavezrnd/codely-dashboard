import { RepositoryWidgetMother } from "../../RepositoryWidgetMother";

describe("Repository Widget Form", () => {
	it("Add new repository with id and url", () => {
		const newWidget = RepositoryWidgetMother.create({
			repositoryUrl: "https://github.com/CodelyTV/react-devdash",
		});

		cy.visit("/");

		cy.findByRole("button", {
			name: new RegExp("Añadir", "i"),
		}).click();

		cy.findByLabelText(/Id/i).type(newWidget.id);
		cy.findByLabelText(/Url del repositorio/i).type(newWidget.repositoryUrl);

		cy.findByRole("button", {
			name: /Añadir/i,
		}).click();

		const widget = cy.findByText("CodelyTV/react-devdash");

		widget.should("exist");
	});

	it("Show error when repository already exists in Dashboard", () => {
		const newWidget = RepositoryWidgetMother.create({
			repositoryUrl: "https://github.com/CodelyTV/react-devdash",
		});

		cy.visit("/");

		cy.findByRole("button", {
			name: new RegExp("Añadir", "i"),
		}).click();

		cy.findByLabelText(/Id/i).type(newWidget.id);
		cy.findByLabelText(/Url del repositorio/i).type(newWidget.repositoryUrl);

		cy.findByRole("button", {
			name: /Añadir/i,
		}).click();

		cy.findByRole("button", {
			name: new RegExp("Añadir", "i"),
		}).click();

		cy.findByLabelText(/Id/i).type(newWidget.id);
		cy.findByLabelText(/Url del repositorio/i).type(newWidget.repositoryUrl);

		cy.findByRole("button", {
			name: /Añadir/i,
		}).click();

		const errorMessage = cy.findByText("Repositorio duplicado");

		errorMessage.should("exist");
	});
});
