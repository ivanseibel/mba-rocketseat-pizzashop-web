import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NavLink } from "./nav-link";

describe("Nav Link", () => {
  it("should highlight the current link", () => {
    const wrapper = render(
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </>,
      {
        wrapper: ({ children }) => (
          <MemoryRouter initialEntries={["/about"]}>{children}</MemoryRouter>
        ),
      },
    );

    expect(wrapper.getByText("Home")).toHaveAttribute("data-current", "false");
    expect(wrapper.getByText("About")).toHaveAttribute("data-current", "true");
  });
});
