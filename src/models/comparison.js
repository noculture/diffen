export default (dbEngine, datatype) => {
  return dbEngine.define(
    "comparison",
    {
      id: {
        type: datatype.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstStudentName: {
        type: datatype.STRING(45),
        isAlphaNumeric: true
      },
      firstFileUrl: {
        type: datatype.STRING(45),
        isAlphaNumeric: true
      },
      secondStudentName: {
        type: datatype.STRING(45),
        isAlphaNumeric: true
      },
      secondFileUrl: {
        type: datatype.STRING(45),
        isAlphaNumeric: true
      },
      results: {
        type: datatype.JSON
      }
    },
    {
      timestamps: true,
      tableName: "comparisons",
      underscored: true
    }
  );
};
