//import { RepositoryWidgetMother } from "../../RepositoryWidgetMother";
import { RepositoryWidget } from "../../../src/domain/RepositoryWidget";

describe("Repository Widget Form", () => {
	it("Add new repository with id and url", () => {
		//const newWidget = RepositoryWidgetMother.create({
		//  repositoryUrl: "https://github.com/CodelyTV/DevDash",
		//});
		const newWidget: RepositoryWidget = {
			id: "2565fa91-2ac4-4e4f-9111-6d27a598083d",
			repositoryUrl: "https://github.com/CodelyTV/react-devdash",
		};

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
		const newWidget: RepositoryWidget = {
			id: "2565fa91-2ac4-4e4f-9111-6d27a598084d",
			repositoryUrl: "https://github.com/CodelyTV/react-devdash",
		};

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
