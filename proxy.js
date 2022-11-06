// string: string type
// int 12.00 and 12 are both integers
// float : for example 12.34
// number: any int or float
// bool: for example true
// types are optional and validation should be skipped if the type isn't specified.
// _ always precedes the type name
const obj = {
  age_int: 2,
  name_string: "Adam",
  job: null,
};

const ALLOW_PROP_TYPES = ["string", "int", "float", "number", "bool"];

const propTypes = {
  check: (prop, value) => {
    if (prop.includes("_") && prop.split("_").length > 1) {
      const propParts = prop.split("_");
      const dataType = propParts[propParts.length - 1];
      if (ALLOW_PROP_TYPES.includes(dataType)) {
        // run validation
        if (Reflect.has(propTypes, dataType) && !propTypes[dataType](value)) {
          throw new Error(`${value} is invalid ${dataType}`);
        }
      }
    }
    return true;
  },
  string: (v) => {
    return typeof v === "string";
  },
  int: (v) => {
    return typeof v === "number" && v % 1 === 0;
  },
  float: (v) => {
    return typeof v === "number" && v % 1 !== 0;
  },
  bool: (v) => {
    return typeof v === "boolean";
  },
  number: (v) => {
    return typeof v === "number";
  },
};

const typeCheck = (obj) => {
  Reflect.ownKeys(obj).map((prop) => {
    propTypes.check(prop, obj[prop]);
  });
  return new Proxy(obj, {
    set(obj, prop, value) {
      propTypes.check(prop, value);
      obj[prop] = value;
      return true;
    },
  });
};

const validateObject = typeCheck(obj);
// validateObject.age_int = 2.5; // throws error
validateObject.age_int = 2;
validateObject.job = "fireman";
// validateObject.address_string = 20; // throws error
validateObject.salary_float = 2500.55;
validateObject.worked_experience_number = 10;
validateObject.is_active_bool = false;
console.log(JSON.stringify(validateObject));
const obj_2 = {
  employed_bool: "true",
};

const validateObject2 = typeCheck(obj_2); // throws error
console.log(validateObject2);
