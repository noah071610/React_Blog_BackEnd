module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4", // mb4는 이모티콘
      collate: "utf8mb4_general_ci", // 한글 되게
    }
  );
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post); // 다 대 다 관계
  };
  return Hashtag;
};
