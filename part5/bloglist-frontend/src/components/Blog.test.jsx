import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Blog } from "./Blog";

test("renders blog title", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Renders blog title",
    url: "www.firstTest.com",
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  );
  expect(element).toBeDefined();
});

test("clicking the 'view'  displays the blog details", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Renders blog title",
    url: "www.firstTest.com",
  };

  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const blogUrl = screen.getByText("www.firstTest.com");
  expect(blogUrl).toBeDefined();

  const blogLikes = screen.getByText("likes");
  expect(blogLikes).toBeDefined();
});

test("clicking the 'likes' button twice, the event handler the component received as props is called twice", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Renders blog title",
    url: "www.firstTest.com",
    likes: 0,
    user: { id: "mock-user-id"}, // Ensure the blog has a user with an id
  };

  const mockHandler = vi.fn();

  // Renders Blog with minimal details
  render(<Blog blog={blog} saveLikeFunction={mockHandler} />);

  // user clicks the view button to show blog details where 'like' button is embedded
  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  // user clicks 'like' button twice
  const likesButton = screen.getByText("like");
  await user.click(likesButton);
  await user.click(likesButton);

  // show that button was clicked twice
  expect(mockHandler.mock.calls).toHaveLength(2);
});
