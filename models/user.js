module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // MYsql에서는 users가 됨, User은 테이블 이름
      // id가 기본적으로 들어있다.
      email: {
        // column 이라고 부른다. 실제 데이터들은 row
        type: DataTypes.STRING(30),
        allowNull: false, // false가 필수
        unique: true, // 고유값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, // false가 필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, // false가 필수
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 되게
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow", // through는 table 아이디
      as: "Followings",
      foreignKey: "FollowerId", // column 아이디
    });
  }; // 관계가 있는것들은 associate에서 관리
  return User;
};
