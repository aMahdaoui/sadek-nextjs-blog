import { nanoid } from 'nanoid';

import data from '../projects/projects.json';

export const getAllProjects = () => {
  return data.projects.map((project) => ({ ...project, id: nanoid() }));
};
