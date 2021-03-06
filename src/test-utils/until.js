// @flow weak

function shallowRecursively(wrapper, selector, { context, ...other }) {
  // enzyme@3
  // if (wrapper.isEmptyRender() || typeof wrapper.getElement().type === 'string') {
  if (wrapper.isEmptyRender() || typeof wrapper.node.type === 'string') {
    return wrapper;
  }

  let newContext = context;

  // enzyme@3
  // const instance = wrapper.root().instance();
  const instance = wrapper.root.instance();
  if (instance.getChildContext) {
    newContext = {
      ...context,
      ...instance.getChildContext(),
    };
  }

  const nextWrapper = wrapper.shallow({ context: newContext, ...other });

  if (selector && wrapper.is(selector)) {
    return nextWrapper;
  }

  return shallowRecursively(nextWrapper, selector, { context: newContext });
}

export default function until(selector, options = {}) {
  return this.single('until', () => shallowRecursively(this, selector, options));
}
