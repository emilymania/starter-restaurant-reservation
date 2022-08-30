function hasProperties(properties) {
    return function (req, res, next) {
    const {data = {}} = req.body;
    try {
      if(data === {}){
          const dataError = new Error('Data is missing');
          dataError.status = 400;
          throw dataError;
      }
      properties.forEach((property) => {   
        if (!data[property]) {
            const propertyError = new Error(`A '${property}' property is required.`);
            propertyError.status = 400;
            throw propertyError;
        }
      });
      next();
      } catch (error) {
        next(error);
      }
    };
  }
  
  module.exports = hasProperties;