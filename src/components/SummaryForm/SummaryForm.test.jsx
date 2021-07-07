import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from './SummaryForm'

test('initial condition', () => {
    render(<SummaryForm />)
    const agreementCheckbox = screen.getByRole("checkbox", { name: "I agree to Terms and Conditions" })
    expect(agreementCheckbox).not.toBeChecked();
    const confirmButton = screen.getByRole("button", { name: /confirm order/i })
    expect(confirmButton).toBeDisabled();
});

test('Checking checkbox enables button on first click and disables on second click', () => {
    render(<SummaryForm />)
    const agreementCheckbox = screen.getByRole("checkbox", { name: "I agree to Terms and Conditions" })
    const confirmButton = screen.getByRole("button", { name: /confirm order/i })

    fireEvent.click(agreementCheckbox)
    expect(confirmButton).toBeEnabled();

    fireEvent.click(agreementCheckbox)
    expect(confirmButton).toBeDisabled();
})