const User = require("./User");
const Tag = require("./Tags");
const Notes = require("./Notes");

User.hasMany(Notes, { foreignKey: "userId", onDelete: "CASCADE" });
Notes.belongsTo(User, { foreignKey: "userId", as: "user" });

Tag.hasMany(Notes, { foreignKey: "tagId", onDelete: "SET NULL", as: "notes" });
Notes.belongsTo(Tag, { foreignKey: "tagId", as: "tag" });

module.exports = { User, Tag, Notes };
