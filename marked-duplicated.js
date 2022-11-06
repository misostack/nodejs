const files = [
  {
    id: 1,
    name: "abc.pdf",
  },
  { id: 2, name: "bcd.pdf" },
  { id: 3, name: "cef.pdf" },
  { id: 4, name: "abc.pdf" },
  { id: 5, name: "abcd.pdf" },
  { id: 6, name: "abcd.pdf" },
  { id: 7, name: "abc.pdf" },
];

// expected

const expectedOutput = [
  {
    id: 1,
    name: "abc.pdf",
    duplicated: false,
  },
  { id: 2, name: "bcd.pdf", duplicated: false },
  { id: 3, name: "cef.pdf", duplicated: false },
  { id: 4, name: "abc.pdf", duplicated: true },
  { id: 5, name: "abcd.pdf", duplicated: false },
  { id: 6, name: "abcd.pdf", duplicated: true },
  { id: 7, name: "abc.pdf", duplicated: true },
];

// answer 1

// let transformedFiles = [];

// files.map((f) => {
//   let transformedFile = { ...f, duplicated: false };
//   if (transformedFiles.find((file) => f.name === file.name)) {
//     transformedFile.duplicated = true;
//   }
//   transformedFiles.push(transformedFile);
// });

// answer 2

let transformedFiles = files.sort((a, b) => a.name.localeCompare(b.name));
transformedFiles = transformedFiles.map((f, index) => {
  if (index === 0)
    return {
      ...f,
      duplicated: false,
    };
  if (f.name.localeCompare(transformedFiles[index - 1].name) === 0)
    return {
      ...f,
      duplicated: true,
    };
  return {
    ...f,
    duplicated: false,
  };
});
transformedFiles.sort((a, b) => a.id - b.id).map((f) => console.log(f));
