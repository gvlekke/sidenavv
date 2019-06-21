import MenuBuilder from './menu-builder.js';

describe('MenuBuilder build', () => {
  it('should return a ul with a collection of li main elements', () => {
    const items = [
      {
        label: 'this is a label',
        link: '/',
        items: []
      },
      {
        label: 'this is a second label',
        link: '/test',
        items: []
      }
    ];

    expect(MenuBuilder.build(items)).toMatchSnapshot();
  });
});

describe('MenuBuilder buildItems', () => {
  it('should return a collection of li elements', () => {
    const items = [
      {
        label: 'this is a label',
        link: '/',
        items: []
      },
      {
        label: 'this is a second label',
        link: '/test',
        items: []
      }
    ];

    expect(MenuBuilder.buildItems(items)).toMatchSnapshot();
  });
});

describe('MenuBuilder buildItem', () => {
  it('should return one li item', () => {
    const item = {
      label: 'this is a label',
      link: '/',
      items: []
    };

    expect(MenuBuilder.buildItem(item)).toMatchSnapshot();
  });

  it('should return one li item with subitems', () => {
    const item = {
      label: 'this is a label',
      link: '/',
      items: [
        {
          label: 'this is a sub label',
          link: '/',
          items: []
        },
        {
          label: 'this is a second sub label',
          link: '/',
          items: []
        }
      ]
    };

    expect(MenuBuilder.buildItem(item)).toMatchSnapshot();
  });
});
