/**
 * @module crypto
 */

let { bech32 } = require("bech32");
let { Buffer } = require("buffer");
let BN = require("bn.js");
// import BN from 'bn.js'
let _ = require("lodash");
let { Hash } = require("eth-lib");

/**
 * Encodes address from hex to bech32 format.
 * @param {string} hexAddr address in hex string
 * @param {string} prefix address prefix
 * @return {string} address with bech32 format
 */

// 判断是否转换fb地址
export const isConvertMainAddr = (addr) => {
  if(!addr){
    return ''
  }
  if (addr.startsWith("fb")) {
    return convertBech32ToHex(addr.trim());
  }
  return addr;
};

// 0x-->fb
export const encodeAddressToBech32 = (hexAddr, prefix = "fb") => {
  if (hexAddr.startsWith("kto") || hexAddr.startsWith("Kto")) {
    hexAddr = hexAddr.slice(4);
    hexAddr = "0x" + hexAddr;
  }
  hexAddr = hexAddr.slice(0, 2) === "0x" ? hexAddr.slice(2) : hexAddr;
  const words = bech32.toWords(Buffer.from(hexAddr, "hex"));
  return bech32.encode(prefix, words);
};

/**
 * Validate address.
 * @param {string} addr bech32 format
 * @return {boolean}
 */
export const validateAddress = (addr) => {
  try {
    const decodeAddress = bech32.decode(addr);
    if (decodeAddress.prefix === "fb") {
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
};

// fb -- >0x

/**
 * Decode address from bech32 to buffer.
 * @param {string} addr bech32 format
 */
export const decodeAddressToBuffer = (addr) => {
  const decodedAddress = bech32.decode(addr);
  return Buffer.from(bech32.fromWords(decodedAddress.words));
};

function buf2hex(buffer) {
  // buffer is an ArrayBuffer
  return Array.prototype.map
    .call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
}

/**
 * Returns true if object is BN, otherwise false
 *
 * @method isBN
 * @param {Object} object
 * @return {Boolean}
 */
var isBN = function (object) {
  return BN.isBN(object);
};

/**
 * Check if string is HEX, requires a 0x in front
 *
 * @method isHexStrict
 * @param {String} hex to be checked
 * @returns {Boolean}
 */
var isHexStrict = function (hex) {
  return (_.isString(hex) || _.isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex);
};

/**
 * Hashes values to a sha3 hash using keccak 256
 *
 * To hash a HEX string the hex must have 0x in front.
 *
 * @method sha3
 * @return {String} the sha3 string
 */
var SHA3_NULL_S =
  "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470";
const sha3 = function (value) {
  if (isBN(value)) {
    value = value.toString();
  }

  if (isHexStrict(value) && /^0x/i.test(value.toString())) {
    value = hexToBytes(value);
  }
  var returnValue = Hash.keccak256(value); // jshint ignore:line

  if (returnValue === SHA3_NULL_S) {
    return null;
  } else {
    return returnValue;
  }
};

/**
 * Converts to a checksum address
 *
 * @method toChecksumAddress
 * @param {String} address the given HEX address
 * @return {String}
 */
const toChecksumAddress = function (address) {
  if (typeof address === "undefined") return "";

  if (!/^(0x)?[0-9a-f]{40}$/i.test(address))
    throw new Error(
      'Given address "' + address + '" is not a valid Ethereum address.'
    );

  address = address.toLowerCase().replace(/^0x/i, "");
  var addressHash = sha3(address).replace(/^0x/i, "");
  var checksumAddress = "0x";
  for (var i = 0; i < address.length; i++) {
    // If ith character is 8 to f then make it uppercase
    if (parseInt(addressHash[i], 16) > 7) {
      checksumAddress += address[i].toUpperCase();
    } else {
      checksumAddress += address[i];
    }
  }
  return checksumAddress;
};

/**
 * covert ex address to 0x address
 * @param bech32Address
 * @returns {Array}
 */
export const convertBech32ToHex = (bech32Address) => {
  const address = decodeAddressToBuffer(bech32Address);
  const hexAddress = toChecksumAddress("0x" + buf2hex(address));
  return hexAddress;
};
