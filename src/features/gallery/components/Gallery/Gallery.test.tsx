import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Gallery from "./Gallery";

describe("Gallery", () => {
    test("renders gallery component", () => {
        render(
            <MemoryRouter>
                <Gallery />
            </MemoryRouter>
        );

        expect(screen.getByRole("main")).toBeInTheDocument();
    });
});