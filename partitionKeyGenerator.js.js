import crypto from "crypto";

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

// helper function for creating sha3 hash
export const createSha3Hash = (data = "") => crypto.createHash("sha3-512").update(data).digest("hex");


/**
 * Determines a partition key from a given event.
 *
 * @param {Object} event - The event for which a partition key should be determined. 
 * Can be anything that can be serialized to JSON.
 *
 * The function behaves as follows:
 * 1. If the event does not exist, it uses a trivial partition key which is set to "0".
 * 2. If the event has a partitionKey property, it uses that.
 * 3. If not, it creates a SHA3-512 hash of the JSON representation of the event.
 * 4. If the resulting partitionKeyCandidate key is not a string, it is converted to a string.
 * 5. If the length of the partitionKeyCandidate key exceeds the maximum length of 256 characters, 
 * it is hashed to reduce its size.
 *
 * @returns {string} The determined partition key.
 */
export const deterministicPartitionKey = (event) => {

  // If the event object does not exist, use the already defined TRIVIAL_PARTITION_KEY above
  // otherwise use the partitionKey Key of the event object if it exists
  // else create new hash using the helper function createSha3Hash defined above
  // the values are store in the variable partitionKeyCandidate
  let partitionKeyCandidate = !event ? TRIVIAL_PARTITION_KEY : (event.partitionKey || createSha3Hash(JSON.stringify(event)));

  // If partitionKeyCandidate is not a string, stringify it.
  partitionKeyCandidate = typeof partitionKeyCandidate === "string" ? partitionKeyCandidate : JSON.stringify(partitionKeyCandidate);

  // If partitionKeyCandidate length exceeds the maximum allowed length, hash it to reduce its size.
  partitionKeyCandidate = partitionKeyCandidate.length <= MAX_PARTITION_KEY_LENGTH ? partitionKeyCandidate : createSha3Hash(partitionKeyCandidate);

  // return partitionKeyCandidate 
  return partitionKeyCandidate;
};
