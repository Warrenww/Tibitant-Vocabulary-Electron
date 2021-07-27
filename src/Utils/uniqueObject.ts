export default function uniqueObject (objects: Record<string, unknown>[], pivot: string) {
  const exists: unknown[] = [];
  const results = objects.reduce((acc, curr) => {
    if (!curr.hasOwnProperty(pivot)) throw new Error(`${pivot} is not a property in object.`);
    if (!exists.includes(curr[pivot])) {
      exists.push(curr[pivot]);
      acc.push(curr);
    }
    return acc;
  }, []);

  return results;  
}
