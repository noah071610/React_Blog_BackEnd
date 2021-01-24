module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // Retweet
    },
    {
      charset: "utf8mb4", // mb4는 이모티콘
      collate: "utf8mb4_general_ci", // 한글 되게
    }
  );
  Post.associate = (db) => {
    // 관계에 따라 커맨드가 생김 ex) post.addComments post.removeLikers post.setRetweet .....
    db.Post.belongsTo(db.User); // 1대 다 관계
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // 다 대 다 관계
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image); // hasOne 도 있음
    db.Post.belongsTo(db.Post, { as: "Retweet" }); // column name 지정
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); // Middle Table Name
  };
  return Post;
};
