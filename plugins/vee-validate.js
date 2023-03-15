import { extend } from "vee-validate";
import { required, email, min, max, regex, integer } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Este campo é obrigatório",
});

extend("minChar", {
  ...min,
  message: "No mínimo {length} caracteres",
  params: ["length"]
});

// 50
extend("maxChar", {
  ...max,
  message: "No máximo {length} caracteres",
  params: ["length"]
});

extend("email", {
  ...email,
  message: "Email inválido",
});


extend("passWordCheck", {
  validate: value => value.match(/(?=.*[}{,.^?~=+\-_\/*\-+.\|])(?=.*[a-zA-Z])(?=.*[0-9]).{8,}/g) !== null,
  message: "Password deve conter 1 caractere especial "
});

extend("passWordCheckChar", {
  validate: value => value.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g) !== null,
  message: "Password deve conter 1 caractere especial"
});

extend("selectRhcodeRegionStatus", {
  validate: (value) => {
    console.log("select value", value)
    return !typeof value != 'number'
  },
  message: "Este campo é obrigatório"
});


extend("cpfRegex", {
  validate: (value) =>
    value.match(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/g) !== null
    && (value.match(/[a-z]/g) == null && value.match(/[A-Z]/g) == null),
  message: "CPF inválido",
});



extend("passwordConfirmation", {
  params: ["target"],
  validate(value, {target}) {
    return value === target;
  },
  message: "As senhas não são idênticas"
})
