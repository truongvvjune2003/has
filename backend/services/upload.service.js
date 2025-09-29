const handleUpload = async (file) => {
  return {
    url: file.path,
    filename: file.filename,
    format: file.format,
    resource_type: file.resource_type,
  };
};

module.exports = { handleUpload };
