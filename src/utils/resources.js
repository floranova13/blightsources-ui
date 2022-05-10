export let resources = [
  {
    name: 'forslone',
    count: 10,
  },
];

export const clearResources = (onlyZeroed = true) => {
  resources = onlyZeroed
    ? resources.filter((resource) => resource.count !== 0)
    : [];
};

export const getResources = () => resources;

export const getResource = (s) => {
  const resource = getResources.find(
    (r) => r.name.toLowerCase() === s.toLowerCase()
  );
  if (!resource) {
    console.error(`Resource of name ${s} not found among user's possessions.`);
  }
  return resource;
};

export const updateResource = (r) => {
  const resource = getResource(r.name);
  resource.count += r.count;
  clearResources();
};
