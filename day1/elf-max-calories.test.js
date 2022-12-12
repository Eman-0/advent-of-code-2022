import findMaxCals from "./elf-max-calories";

const maxCalories = async () => {
  const answer = await findMaxCals('./elf-calorie-short');
  return answer;
};

test("Answer should be 37334", async () => {
  const answer = await maxCalories();
  expect(answer).toEqual(37334);
});
