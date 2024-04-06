function highlight(table) {
  const rows = Array.from(table.rows);
  rows.forEach((row) => {
    if (row.cells[3].dataset.available) {
      if (row.cells[3].dataset.available === "true") {
        row.classList.add("available");
      } else {
        row.classList.add("unavailable");
      }
    } else {
      row.setAttribute("hidden", "");
    }
    if (row.cells[2].textContent === "m") {
      row.classList.add("male");
    } else if (row.cells[2].textContent === "f") {
      row.classList.add("female");
    }
    if (+row.cells[1].textContent < 18) {
      row.style = "text-decoration: line-through";
    }
  });
}
