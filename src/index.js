import MenuBuilder from './menu-builder/menu-builder';
import './index.sass';

const defaultOptions = {
  openOnInit: false,
  menuItems: null,
  containerTarget: '.sidenavv',
  toggleOpenTarget: '.sidenavv-toggle',
  closeSubItemsWhenMenuCloses: true,
};

export default class SideNavv {
  constructor(options) {
    this.options = {
      ...defaultOptions,
      ...options
    };

    this.setupContainer();
    this.initMenuItems();
    this.bindMenuItems();
    this.bindToggleButton();

    console.log(this.options);
  }

  setupContainer() {
    this.container = document.querySelector(this.options.containerTarget);
    this.container.classList.add('sidenavv');
  }

  initMenuItems() {
    if (this.options.menuItems !== null && Array.isArray(this.options.menuItems)) {
      const html = MenuBuilder.build(this.options.menuItems);

      this.container.insertAdjacentHTML('beforeend', html);
    }
  }

  bindToggleButton() {
    const button = document.querySelector('.sidenavv-toggle');
    if (button) {
      button.addEventListener('click', event => {
        this.toggleMenu();
      });
    }
  }
  
  // TODO: search all items and devide
  bindMenuItems() {
    const items = document.querySelectorAll('.sidenavv__item--has-sub');
    for (const item of items) {
      item.addEventListener('click', event => {
        debugger
        event.currentTarget.classList.toggle('sidenavv__item--open');
        event.currentTarget.closest('ul').classList.toggle('sidenavv__page--move-away')
      });
    }
  }

  toggleMenu() {
    if (this.options.closeSubItemsWhenMenuCloses && this.container.classList.value.includes('sidenavv--open')) {
      this.closeSubItems();
    }
    this.container.classList.toggle('sidenavv--open');
  }

  closeSubItems() {
    const itemsOpen = this.container.querySelectorAll('.sidenavv__item--open');
    for (const item of itemsOpen) {
      item.classList.remove('sidenavv__item--open');
    }
  }
}
