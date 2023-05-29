import { deterministicPartitionKey, createSha3Hash } from "./partitionKeyGenerator.js.js";
import crypto from "crypto";

describe("Deterministic Partition Key Function Tests", () => {

  describe("tests for createSha3Hash function", () => {
    it("should return the correct SHA3-512 hash", () => {
      const data = "test data";
      const expectedHash = crypto.createHash("sha3-512").update(data).digest("hex");
      expect(createSha3Hash(data)).toEqual(expectedHash);
    });

    it("should return the correct SHA3-512 hash for empty input", () => {
      const data = "";
      const expectedHash = crypto.createHash("sha3-512").update(data).digest("hex");
      expect(createSha3Hash()).toEqual(expectedHash);
    });
  });


  describe("tests for deterministicPartitionKey function", () => {
    it("Returns the literal '0' when given no input", () => {
      const trivialKey = deterministicPartitionKey();
      expect(trivialKey).toBe("0");
    });

    it("should return the partitionKey if it is present", () => {
      const event = { partitionKey: "key" };
      expect(deterministicPartitionKey(event)).toEqual("key");
    });

    it("should hash the event object if partitionKey is not present", () => {
      const event = { data: "data" };
      expect(deterministicPartitionKey(event)).toEqual(createSha3Hash(JSON.stringify(event)));
    });

    it("should hash the partitionKey if its length exceeds the maximum length", () => {
      const longKey = "a".repeat(257);
      const event = { partitionKey: longKey };
      expect(deterministicPartitionKey(event)).toEqual(createSha3Hash(longKey));
    });

    it('should return "0" if event is undefined', () => {
      expect(deterministicPartitionKey()).toEqual("0");
    });

    it('should return "0" if event is null', () => {
      expect(deterministicPartitionKey(null)).toEqual("0");
    });

    it("should handle boolean partitionKey correctly", () => {
      const event = { partitionKey: true };
      expect(deterministicPartitionKey(event)).toEqual("true");
    });

    it("should handle number partitionKey correctly", () => {
      const event = { partitionKey: 123 };
      expect(deterministicPartitionKey(event)).toEqual("123");
    });

    it("should handle long string partitionKey correctly", () => {
      const event = { partitionKey: "a".repeat(255) };
      expect(deterministicPartitionKey(event)).toEqual("a".repeat(255));
    });
  });
});
