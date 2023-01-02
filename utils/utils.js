import fs from 'fs';
import path from 'path';

export const getDataFromFile = async (fileName) => {
  return JSON.parse(
    await fs.promises.readFile(path.resolve(`mocks/${fileName}`), 'utf-8'),
  );
};
