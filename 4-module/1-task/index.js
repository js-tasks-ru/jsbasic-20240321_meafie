function makeFriendsList(friends) {
  const list = document.createElement("ul");
  friends.forEach((item) => {
    list.innerHTML += `<li>${item.firstName} ${item.lastName}</li>`;
  });
  return list;
}
