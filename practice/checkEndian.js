// how to check littleEndian

// solution1
const uInt8Array = new Uint8Array(2);
new DataView(uInt8Array.buffer).setUint16(0, 258, false); // bigEndian write
uInt8Array.map((v, i) => console.log(v, i));
/* mac littleEndian read
> 1 0
> 2 1
*/
console.log(uInt8Array[0] === 1) // true
console.log(uInt8Array[1] === 2) // true


// solution2
const littleEndian = (() => {
    const buffer = new ArrayBuffer(2);
    new DataView(buffer).setInt16(0, 256, true /* littleEndian */ );
    // Int16Array uses the platform's endianness.
    return new Int16Array(buffer)[0] === 256;
})();
console.log(littleEndian); // true or false