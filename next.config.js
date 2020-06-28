const withTM = require('next-transpile-modules')(['gsap']); // pass the modules you would like to see transpiled
 
module.exports = withTM();

// module.exports = {
//   generateBuildId: async () => {
//     // For example get the latest git commit hash here
//     return 'beve-dev-build-id';
//   }
// };