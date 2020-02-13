export default (dbEngine, datatype) => {
  return dbEngine.define(
    "user",
    {
      id: {
        type: datatype.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: datatype.STRING(45),
        isAlphaNumeric: true
      },
      password: {
        type: datatype.STRING(255),
        isAlphaNumeric: true
      }
    },
    {
      timestamps: true,
      tableName: "users",
      underscored: true
    }
  );
};
