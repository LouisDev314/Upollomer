// require the class name of the input be 'filepond'
FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageCrop,
    FilePondPluginImageResize,
    FilePondPluginImageTransform,
    FilePondPluginFileEncode,
);

FilePond.setOptions({
    // 135 / 240,
    stylePanelAspectRatio: '16:9',
    imageCropAspectRatio: 1,
    imageResizeTargetWidth: 240,
    imageResizeTargetHeight: 135,
    imageTransformVariants: {
        thumb_medium_: (transforms) => {
            transforms.resize = {
                size: {
                    width: 240,
                    height: 135
                }
            };
            return transforms;
        }
    }
});

FilePond.parse(document.body);