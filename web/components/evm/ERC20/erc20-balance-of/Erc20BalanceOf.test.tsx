import { screen, render } from "tests";

import { Erc20BalanceOf } from "./Erc20BalanceOf";

describe("Erc20BalanceOf", () => {
  it("renders children correctly", () => {
    render(<Erc20BalanceOf>Erc20BalanceOf</Erc20BalanceOf>);

    const element = screen.getByText("Erc20BalanceOf");

    expect(element).toBeInTheDocument();
  });
});
