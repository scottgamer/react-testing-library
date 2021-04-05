import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("displays image for each scoop", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt tet of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["chocolate scoop", "vanilla scoop"]);
});

test("displays image for each toppings option from server", async () => {
  // mock service worker will return 3 toppings from server
  render(<Options optionType="toppings" />);
  // find images, expect 3 based on what msw returns
  const images = await screen.findAllByRole("img", { name: /topping$/i });
  expect(images).toHaveLength(3);

  // check actual alt text for the images
  const imageTitles = images.map((img) => img.alt);
  expect(imageTitles).toStrictEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
