const fs = jest.genMockFromModule('fs-extra');

const ensureDirSync = () => true;
const removeSync = () => true;

const writeFileSync = (path, data) => {
  return { path, data };
};

fs.ensureDirSync = ensureDirSync;
fs.removeSync = removeSync;
fs.writeFileSync = writeFileSync;

export default fs;
