import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders role select landing", () => {
  render(<App />);
  const title = screen.getByText(/Digital Bootcamp/i);
  expect(title).toBeInTheDocument();
});
