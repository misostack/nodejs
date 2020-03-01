#!/usr/bin/env node

const util = require("util");
const Joi = require("@hapi/joi");

const userSchema = Joi.object({
  firstName: Joi.string().max(60).required(),
  lastName: Joi.string().max(60).required(),
  email: Joi.string().max(320).email().required(),
  jobName: Joi.string().max(120).required(),
  phoneNumber: Joi.string()
    .max(14)
    .pattern(/(\d{9,14})/)
    .required(),
});

const input = {
  userData: {
    firstName: "012345678",
    lastName: "asdasd",
    email: "techlead@sonnm.com",
    jobName: "Software Engineer",
    phoneNumber: "0937590489",
  },
};

const { error, value } = userSchema.validate(input.userData, {
  abortEarly: false, //important flag
});

const transformError = ({ message, path, type }) => {
  const field = path.join("_");
  return {
    field,
    type,
    errorMsgId: `error.${field}.${type}`,
  };
};

if (error) {
  console.log(util.inspect(error.details.map((e) => transformError(e))));
} else {
  console.log("userData:", value);
}
