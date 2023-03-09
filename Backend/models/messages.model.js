module.exports = (sequelize, DataTypes) => {
	const Messages = sequelize.define(
		'messages',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{ timestamps: false }
	);
	return Messages;
};
