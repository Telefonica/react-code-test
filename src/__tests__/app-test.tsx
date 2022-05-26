import { render, screen } from "@testing-library/react";
import App from "../app";
import apiResponse from "../__stubs__/api-response";
import * as api from "../api";
import { getTelefonicaSkin, ThemeContextProvider } from "@telefonica/mistica";
import userEvent from "@testing-library/user-event";

const renderApp = () => {
    render(
        <ThemeContextProvider
            theme={{
                skin: getTelefonicaSkin(),
                i18n: {
                    locale: "es-ES",
                    phoneNumberFormattingRegionCode: "ES",
                },
                enableTabFocus: true,
            }}
        >
            <App />
        </ThemeContextProvider>
    );
};

test("Task 1", async () => {
    jest.spyOn(api, "fetchPeople").mockResolvedValue(apiResponse);

    renderApp();

    const person1 = apiResponse[0];
    const person1Name = person1.name.first + " " + person1.name.last;

    const personRow = await screen.findByRole("button", { name: person1Name });
    expect(personRow).toBeInTheDocument();

    await userEvent.click(personRow);

    const locationTab = await screen.findByRole("tab", { name: "Location" });
    expect(locationTab).toBeInTheDocument();

    await userEvent.click(locationTab);

    const person1Street = person1.location.street.name;

    expect(
        await screen.findByText(person1Street, { exact: false })
    ).toBeInTheDocument();
});
