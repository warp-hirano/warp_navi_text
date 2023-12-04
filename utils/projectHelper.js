export const getNextProject = (currentId, projects = []) => {
  if (projects.length > 0) {
    const currentProjectIndex = projects.findIndex((p) => {
      return p.id === currentId;
    });

    // If we found the current project
    if (currentProjectIndex !== -1) {
      // And it it the last one
      if (currentProjectIndex === projects.length - 1) {
        return projects[0];
      } else {
        return projects[currentProjectIndex + 1];
      }
    }
  }
  return null;
};
