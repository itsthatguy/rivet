const fs = jest.genMockFromModule('fs-extra');

export const ensureDirSync = () => true;
export const removeSync = () => true;

export const writeFileSync = (path, data) => {
  return { path, data };
};

fs.ensureDirSync = ensureDirSync;
fs.removeSync = removeSync;
fs.writeFileSync = writeFileSync;

export default fs;
