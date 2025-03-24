import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mock } from "jest-mock-extended";

import { DomainEvents } from "../../../src/domain/DomainEvents";
import { RepositoryWidget } from "../../../src/domain/RepositoryWidget";
import { LocalStorageRepositoryWidgetRepository } from "../../../src/infrastructure/LocalStorageWidgetRepository";
import { AddRepositoryWidgetForm } from "../../../src/sections/dashboard/repositoryWidget/AddRepositoryWidgetForm";

const mockRepository = mock<LocalStorageRepositoryWidgetRepository>();

describe("AddWidgetForm", () => {
	it("show widget form when add button is clicked", async () => {
		render(<AddRepositoryWidgetForm repository={mockRepository} />);

		const button = await screen.findByRole("button", {
			name: new RegExp("Añadir", "i"),
		});

		act(() => {
			userEvent.click(button);
		});

		const url = screen.getByLabelText(/Url del repositorio/i);

		expect(url).toBeInTheDocument();
	});

	it("save new widget when form is submitted", async () => {
		const dispatchEventSpy = jest.spyOn(document, "dispatchEvent");
		mockRepository.search.mockResolvedValue([]);

		const newWidget: RepositoryWidget = {
			id: "newWidgetId",
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		};

		render(<AddRepositoryWidgetForm repository={mockRepository} />);

		const button = await screen.findByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});
		act(() => {
			userEvent.click(button);
		});

		const id = screen.getByLabelText(/Id/i);
		userEvent.type(id, newWidget.id);

		const url = screen.getByLabelText(/Url del repositorio/i);
		userEvent.type(url, newWidget.repositoryUrl);

		const submitButton = await screen.findByRole("button", {
			name: /Añadir/i,
		});
		await act(async () => {
			userEvent.click(submitButton);
		});

		const addAnotherRepositoryFormButton = await screen.findByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});

		expect(addAnotherRepositoryFormButton).toBeInTheDocument();
		expect(mockRepository.save).toHaveBeenCalledWith(newWidget);

		expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(Event));
		expect(dispatchEventSpy.mock.calls[0][0].type).toBe(DomainEvents.repositoryWidgetAdded);
	});

	it("show error when repository already exists in Dashboard", async () => {
		mockRepository.save.mockReset();

		const existingWidget: RepositoryWidget = {
			id: "existingWidgetId",
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		};

		mockRepository.search.mockResolvedValue([existingWidget]);

		const newWidgetWithSameUrl: RepositoryWidget = {
			id: "newWidgetId",
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		};

		render(<AddRepositoryWidgetForm repository={mockRepository} />);

		const button = await screen.findByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});
		act(() => {
			userEvent.click(button);
		});
		const id = screen.getByLabelText(/Id/i);
		userEvent.type(id, newWidgetWithSameUrl.id);

		const url = screen.getByLabelText(/Url del repositorio/i);
		userEvent.type(url, newWidgetWithSameUrl.repositoryUrl);

		const submitButton = await screen.findByRole("button", {
			name: /Añadir/i,
		});
		await act(async () => {
			userEvent.click(submitButton);
		});

		const errorMessage = await screen.findByRole("alert", {
			description: /Repositorio duplicado/i,
		});

		expect(errorMessage).toBeInTheDocument();
		expect(mockRepository.save).not.toHaveBeenCalled();
	});
});
