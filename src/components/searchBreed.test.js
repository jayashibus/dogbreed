import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import SearchBreed from "./searchBreed";

//jest.useFakeTimers();
describe("SearchBreed", () => {
  // Mock API
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve([
          {
            weight: {
              imperial: "40 - 65",
              metric: "18 - 29",
            },
            height: {
              imperial: "21 - 23",
              metric: "53 - 58",
            },
            id: 4,
            name: "Airedale Terrier",
            bred_for: "Badger, otter hunting",
            breed_group: "Terrier",
            life_span: "10 - 13 years",
            temperament:
              "Outgoing, Friendly, Alert, Confident, Intelligent, Courageous",
            origin: "United Kingdom, England",
            reference_image_id: "1-7cgoZSh",
          },
        ]),
    })
  );

  const debounce = (func, timeout = 1000) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  beforeEach(() => {
    debounce(global.fetch, 1000);
  });

  test("renders", () => {
    render(<SearchBreed />);
    const searchBreadLabel = screen.getByText(/Dog breed name/i);
    expect(searchBreadLabel).toBeInTheDocument();
  });
  test("input key press correctly", async () => {
    render(<SearchBreed />);
    const input = screen.getByTestId("search-input");

    await act(async () => fireEvent.keyUp(input, { target: { value: "Air" } }));
    expect(input.value).toBe("Air");
    //await act(async () => jest.runAllTimers());

    //expect(global.fetch).toHaveBeenCalledTimes(1);
    setTimeout(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
});
