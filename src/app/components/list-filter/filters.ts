
export function numberFilter (value: number, filterStr: string): boolean {
  return value + '' === filterStr;
}

export function stringFilter(value: string, filterStr: string): boolean {
  return value.includes(filterStr);
}

export function arrayFilter(value: any[], filterStr: string): boolean {
  return [...value].filter(item => {
    return filter(item, filterStr);
  }).length > 0;
}

export function objectFilter(value: any[], filterStr: string): boolean {
  return arrayFilter(Object.values(value), filterStr);
}

export function filter(value: any, filterStr: string): boolean {
  if (!filterStr) {
    return true;
  }
  switch (typeof value) {
    case 'string':
      return stringFilter(value, filterStr);
    case 'number':
      return numberFilter(value, filterStr);
    case 'object':
      if (value instanceof Array) {
        return arrayFilter(value, filterStr);
      }
      return objectFilter(value, filterStr);
    default:
      return true;
  }
}
