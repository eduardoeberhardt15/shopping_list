export default function FormatErrors(error) {
    const errors = error?.response?.data?.errors;
    let formattedErrors = '';
  
    if (typeof error === 'string') {
      return error;
    }
  
    try {
      if (errors) {
        errors.map((error, idx, array) => {
          if (error.message) {
            formattedErrors += `${error.message}`;
            if (idx < array - 1) {
              formattedErrors += '\n';
            }
          } else {
            formattedErrors +=
              'Ocorreu um erro, tente novamente mais tarde ou informe ao suporte.';
          }
        });
        return formattedErrors;
      }
      return 'Ocorreu um erro, tente novamente mais tarde ou informe ao suporte.';
    } catch (error) {
      return 'Ocorreu um erro, tente novamente mais tarde ou informe ao suporte.';
    }
  }
  