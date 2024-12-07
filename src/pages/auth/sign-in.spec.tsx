import { QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { queryClient } from "../../lib/react-query";
import { SignIn } from "./sign-in";

describe("SignIn", () => {
  it("should set default email input value if email is present on search parms", () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => (
        <HelmetProvider>
          <MemoryRouter initialEntries={["/sign-in?email=johndoe@email.com"]}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </MemoryRouter>
        </HelmetProvider>
      ),
    });

    const emailInput = wrapper.getByLabelText("Email") as HTMLInputElement;

    expect(emailInput.value).toBe("johndoe@email.com");
  });
});
