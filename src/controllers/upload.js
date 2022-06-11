const { generateUploadURL } = require('../utils/aws');

exports.getS3Url = async (req, res) => {
	const url = await generateUploadURL();

	return res.send({ url });
};
