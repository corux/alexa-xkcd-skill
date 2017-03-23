const { name, description, version } = require('../package.json');

export default {
  accessKeyId: '',
  secretAccessKey: '',
  role: '',
  functionName: name,
  description: `${description} (version ${version})`,
  region: '',
  handler: 'index.handler'
};
