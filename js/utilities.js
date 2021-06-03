export const currentDate = () => {
  const creationDate = new Date();
  const dd = creationDate.getDate();
  const mm = creationDate.getMonth() + 1;
  const yyyy = creationDate.getFullYear();
  return dd + "/" + mm + "/" + yyyy;
};
