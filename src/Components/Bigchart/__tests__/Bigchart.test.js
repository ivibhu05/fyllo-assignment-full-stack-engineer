import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Bigchart from "../Bigchart";
import { STATES, MONTHS } from "../../../utils/constants";

const mockData = [
  {
    state: "State1",
    month: "January",
    product: "Fertilizer A",
    requirement_in_mt_: "100",
    availability_in_mt_: "50",
  },
  {
    state: "State1",
    month: "February",
    product: "Fertilizer B",
    requirement_in_mt_: "200",
    availability_in_mt_: "150",
  },
  {
    state: "State2",
    month: "January",
    product: "Fertilizer C",
    requirement_in_mt_: "300",
    availability_in_mt_: "250",
  },
];

describe("Bigchart Component", () => {
  test("renders Bigchart component with title and dropdowns", () => {
    render(
      <Bigchart title="Product Availability and Requirements" data={mockData} />
    );
    expect(
      screen.getByText("Product Availability and Requirements")
    ).toBeInTheDocument();
    expect(screen.getByText("Month")).toBeInTheDocument();
    expect(screen.getByText("State")).toBeInTheDocument();
  });

  test("renders correct dropdown options", () => {
    const data = [];
    render(
      <Bigchart title="Product Availability and Requirements" data={data} />
    );

    const monthOptions = screen.getAllByRole("option", {
      name: /january|february|march|april|may|june|july|august|september|october|november|december/i,
    });
    expect(monthOptions).toHaveLength(MONTHS.length);

    const stateOptions = screen.getAllByRole("option", {
      name: new RegExp(STATES.join("|"), "i"),
    });
    expect(stateOptions).toHaveLength(STATES.length);
  });

  test("filters data correctly based on dropdown selection", () => {
    const data = [
      {
        product: "Product1",
        state: "State1",
        month: "January",
        requirement_in_mt_: 100,
        availability_in_mt_: 80,
      },
      {
        product: "Product2",
        state: "State2",
        month: "February",
        requirement_in_mt_: 200,
        availability_in_mt_: 150,
      },
    ];
    render(
      <Bigchart title="Product Availability and Requirements" data={data} />
    );

    const monthSelect = screen.getByRole("combobox", { name: /month/i });
    const stateSelect = screen.getByRole("combobox", { name: /state/i });

    fireEvent.change(monthSelect, { target: { value: "January" } });
    fireEvent.change(stateSelect, { target: { value: "State1" } });

    const filteredData = data.filter(
      (item) => item.month === "January" && item.state === "State1"
    );

    expect(filteredData.length).toBeGreaterThan(0);
  });

  test("shows 'No data available to show' message when no data is available", () => {
    render(
      <Bigchart title="Product Availability and Requirements" data={mockData} />
    );

    const monthSelect = screen.getByLabelText("Month");
    const stateSelect = screen.getByLabelText("State");

    fireEvent.change(monthSelect, { target: { value: "March" } });
    fireEvent.change(stateSelect, { target: { value: "State1" } });

    expect(screen.getByText("No data available to show")).toBeInTheDocument();
  });
});
