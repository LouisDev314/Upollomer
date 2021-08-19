const { FilePond } = require("filepond");

// register FilePond plugins
FilePond.registerPlugin(
    FilePondPluginImageReview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
);

FilePond.parse(document.body);