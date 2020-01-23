/**
 * Checks if an object is valid based on the constraint set by the user.
 *
 * @param {bbject} obj Object to verify.
 * @param {object} requirements List of requirements obj must fullfill for the function to return true.
 *
 * @return {boolean} True if obj meet the requirements set by the user; false otherwise.
 */

const verifyObjectValidity = (obj, requirements) => {
  const keys = Object.keys(requirements);
  const objectLength = Object.keys(obj).length;

  if (keys.length !== objectLength) return false;

  for (const key of keys) {
    if (obj[key] === null || typeof obj[key] !== requirements[key])
      return false;
  }

  return true;
};

module.exports = { verifyObjectValidity };
