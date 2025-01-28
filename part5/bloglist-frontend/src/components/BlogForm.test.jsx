import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit"),
  async () => {
    const createBlog = vi.fn();
    const user = userEvent.setup();

    const input = screen.getByRole("textbox");
    const createButton = screen.getByText("create");

    await user.type(input, "testing a form...");
    await user.click(createButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].content).toBe("testing a form");
  };
