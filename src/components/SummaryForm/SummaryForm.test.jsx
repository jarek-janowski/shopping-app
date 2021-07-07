import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import SummaryForm from './SummaryForm'
import userEvent from '@testing-library/user-event'

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

    userEvent.click(agreementCheckbox)
    expect(confirmButton).toBeEnabled();

    userEvent.click(agreementCheckbox)
    expect(confirmButton).toBeDisabled();
})

test('popover responds to hover', async () => {
    render(<SummaryForm />)

    //popover starts out hidden
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();

    //popover appears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);

    const popover = screen.getByText(/no ice cream will actually be delivered/i)
    expect(popover).toBeInTheDocument();
    //popover disappears when we mouse out
    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() =>
        screen.queryByText(/no ice cream will actually be delivered/i)
    )
    // const nullPopoverAgain = screen.queryByText(/no ice cream will actually be delivered/i)
    // expect(nullPopoverAgain).not.toBeInTheDocument();
})