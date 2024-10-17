import { screen, render } from "tests";

import { ERC721MintButton } from "./Mint";

describe("Mint", () => {
  it("renders children correctly", () => {
    render(<ERC721MintButton>Mint</ERC721MintButton>);

    const element = screen.getByText("Mint");

    expect(element).toBeInTheDocument();
  });
});
