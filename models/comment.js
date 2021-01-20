module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4", // mb4는 이모티콘
      collate: "utf8mb4_general_ci", // 한글 되게
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post); // 누가 작성했는지 누구 게시글인지 column이 생김 그게 belongsTo의 역할
  };
  return Comment;
};
