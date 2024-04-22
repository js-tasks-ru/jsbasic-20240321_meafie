/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = null;
  #rows = [];
  constructor(rows) {
    this.#rows = rows || this.#rows;
    this.elem = this.#create();
  }
  #layout() {
    return `
    <thead>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
    ${this.#rows.map(
      (row) => `
    <tr>${Object.values(row).map(
      (ceil) => `
      <td>${ceil}</td>`
    )}
    <td><button>X</button></td>
    </tr>`
    )}
    </tbody>
    `;
  }
  #create() {
    this.elem = document.createElement("table");
    this.elem.innerHTML = this.#layout();
    let rows = this.elem.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      row.querySelector("button").addEventListener("click", () => {
        row.remove();
      });
    });
    return this.elem;
  }
}
