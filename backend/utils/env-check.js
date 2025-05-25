// Utility to check if environment variables are properly loaded
const checkEnv = () => {
  const requiredVars = ['MONGO_URI', 'JWT_SECRET'];
  const missingVars = [];
  
  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  });
  
  return {
    allPresent: missingVars.length === 0,
    missingVars,
    envSummary: {
      MONGO_URI: process.env.MONGO_URI ? 'Set (starts with: ' + process.env.MONGO_URI.substring(0, 15) + '...)' : 'Not set',
      JWT_SECRET: process.env.JWT_SECRET ? 'Set (length: ' + process.env.JWT_SECRET.length + ')' : 'Not set'
    }
  };
};

module.exports = { checkEnv };
