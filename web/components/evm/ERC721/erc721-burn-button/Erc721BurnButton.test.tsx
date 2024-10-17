import { screen, render } from "tests";

import { Erc721BurnButton } from "./Erc721BurnButton";

describe("Erc721BurnButton", () => {
  it("renders children correctly", () => {
    render(<Erc721BurnButton>Erc721BurnButton</Erc721BurnButton>);

    const element = screen.getByText("Erc721BurnButton");

    expect(element).toBeInTheDocument();
  });
});
