import { render, screen } from "@testing-library/react";
import React from "react";
import MainApp from "./App";

test("renders preloader", () => {
  render(<MainApp />);
  const image = screen.getByAltText(/loading/i);
  expect(image).toBeInTheDocument();
});

// test("renders header", () => {
//   render(<MainApp />);
//   const header = screen.getByText(/social network/i);
//   expect(header).toBeInTheDocument();
// });
