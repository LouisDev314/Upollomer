// require the class name of the input be 'filepond'
FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
);

FilePond.setOptions({
    stylePanelAspectRatio: 135 / 240,
    imageResizeTargetWidth: 240,
    imageResizeTargetHeight: 135
});

FilePond.parse(document.body);
