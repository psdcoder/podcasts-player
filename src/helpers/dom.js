export function hasParent(target, parent) {
  let node = target;
  let comparisonFn = null;

  if (typeof parent === 'function') {
    comparisonFn = parent;
  } else if (parent instanceof Array) {
    comparisonFn = comparisonNode => parent.some(p => hasParent(comparisonNode, p));
  } else if (typeof parent === 'string') {
    comparisonFn = comparisonNode => comparisonNode.matches(parent);
  } else if (parent instanceof Node) {
    comparisonFn = comparisonNode => comparisonNode === parent;
  }

  if (!comparisonFn) {
    return false;
  }

  while (node && node instanceof Element) {
    const comparisonResult = comparisonFn(node);

    if (comparisonResult) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}
