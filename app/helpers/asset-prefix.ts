/**
 * Using js syntax instead of ts here so we can use in node scripts as well
 */

const assetPrefix = process.env.NODE_ENV === 'production' ? '/nhss' : '';

module.exports = assetPrefix;
