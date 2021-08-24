// require the class name of the input be 'filepond'
FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
);

FilePond.setOptions({
    // 135 / 240,
    stylePanelAspectRatio: '16:9',
    imageResizeTargetWidth: 240,
    imageResizeTargetHeight: 135
});

FilePond.parse(document.body);
