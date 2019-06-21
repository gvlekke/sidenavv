export default class MenuBuilder {
  static build(items) {
    let html = '<nav class="sidenavv__items">';
    html += this.buildItems(items);
    html += '</nav>';
    return html;
  }

  static buildItems(items) {
    let html = `<ul class="sidenavv__page">`;
    return items.reduce((accumulator, currentValue, index) => {
      if (index === 1) {
        html += this.buildItem(accumulator);
        html += this.buildItem(currentValue);
        html += `</ul>`;
        return html;
      } else {
        html += this.buildItem(currentValue);
        html += `</ul>`;
        return accumulator + html;
      }
    });
  }

  static buildItem(item) {
    const label = item.label;
    let classes = '';
    if (item.items.length > 0) {
      classes += 'sidenavv__item--has-sub';
    }
    let html = `
      <li class="sidenavv__item ${classes}">
        <a class="sidenavv__item__label">${label}</a>
      `;

    if (item.items.length > 0) {
      const itemsHtml = this.buildItems(item.items);
      html += `
        <div class="sidenavv__item__submenu-container">
          ${itemsHtml}
        </div>
      `;
    }

    html += `
      </li>
    `;
    return html;
  }
}
