import User from "@modules/users/models/user.models";
import Student from "@modules/student/models/student.models";
import UserStatus from "@modules/users/models/userStatus.models";

User.hasOne(Student, { foreignKey: "user_id", as: "student" });
Student.belongsTo(User, { foreignKey: "user_id", as: "user" });

User.belongsTo(UserStatus, { foreignKey: "user_status_id", as: "status" });
