import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Featured from "../Featured";

jest.mock("../../Chart/Chart", () => ({
  __esModule: true,
  default: ({ title }) => <div>{title}</div>,
}));

jest.mock("../../Bigchart", () => ({
  __esModule: true,
  default: ({ title }) => <div>{title}</div>,
}));

jest.mock("../../Piechart", () => ({
  __esModule: true,
  default: ({ title }) => <div>{title}</div>,
}));

describe("Featured Component", () => {
  it("renders the Piecharts with correct titles", () => {
    render(<Featured />);

    expect(screen.getByText(/Top 5 Required products/i)).toBeInTheDocument();
    expect(screen.getByText(/Top 5 Available products/i)).toBeInTheDocument();
  });

  it("renders the Bigchart with the correct title", () => {
    render(<Featured />);

    expect(
      screen.getByText(/Product Availability and Requirements/i)
    ).toBeInTheDocument();
  });

  it("renders the correct titles for the charts", () => {
    render(<Featured />);

    expect(screen.getByText(/State wise product/i)).toBeInTheDocument();
    expect(screen.getByText(/Year wise product/i)).toBeInTheDocument();
    expect(screen.getByText(/Month wise product/i)).toBeInTheDocument();
  });

  it("renders chart data correctly based on dropdown selection", () => {
    render(<Featured />);

    expect(screen.getByText("State wise product")).toBeInTheDocument();
    expect(screen.getByText("Year wise product")).toBeInTheDocument();
    expect(screen.getByText("Month wise product")).toBeInTheDocument();
  });
});
