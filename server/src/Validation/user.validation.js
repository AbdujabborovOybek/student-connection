const AJV = require("ajv");
const ajv = new AJV();

class userValidation {
  static async cheack(schema, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await ajv.validate(schema, data);

        if (!result) {
          return reject(ajv.errorsText());
        } else {
          return resolve(null);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  static async signup(req, res, next) {
    const data = req.body;

    console.log("====================================");
    console.log(data.phone.length);
    console.log("====================================");

    const schema = {
      type: "object",
      properties: {
        fullname: {
          type: "string",
          minLength: 3,
          maxLength: 25,
        },
        username: {
          type: "string",
          minLength: 5,
          maxLength: 20,
          pattern: "^[a-z0-9_]*$",
        },
        phone: {
          type: "string",
          minLength: 16,
          maxLength: 16,
          pattern: "^[+][0-9]{3} [0-9]{2} [0-9]{3} [0-9]{4}$",
        },
        password: {
          type: "string",
          minLength: 5,
          maxLength: 15,
          pattern: "^[a-zA-Z0-9_]*$",
        },
      },

      required: ["fullname", "username", "phone", "password"],
      additionalProperties: false,
    };
    try {
      await userValidation.cheack(schema, req.body);
      next();
    } catch (err) {
      res.status(400).json({
        message: err,
        variant: "warning",
      });
    }
  } 
}

module.exports = userValidation;
