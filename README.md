# MSC-Three-Gltf-Reader
 MSC-Three-Gltf-Reader :a three.js html project

![Image](https://github.com/mu116699/MSC-Three-Gltf-Reader/blob/master/Image/basic%20Usage.gif)

The GIF above demonstrates the basic usage rules of the software, which mainly include the following two aspects:、

    1.View Manipulation: Right-click with the mouse to move and rotate the view; use the mouse scroll wheel to zoom the view; right-click again to perform movement operations.
    2. Model Selection and Editing: Click on a model to select its components. If multiple models intersect, the topmost component will be selected. Once selected, 
    you can modify the features of the selected components. To deselect, simply click the right mouse button.

![Image](https://github.com/mu116699/MSC-Three-Gltf-Reader/blob/master/Image/Explosive%20View.png)

The editing features provided are as follows:

    1.The camera positioning works in conjunction with the "Save Image" function. First, adjust the camera position, and then use "Save Image" to save the image.
    2.During the process of setting the attribute  of a glTF model object, if you are unable to select certain internal parts, you can use "Explosive View" to generate an exploded view. 
    You can generate multiple exploded view images until you are able to select the specific object you want to edit. "Restore EV" is used to restore the exploded view.
    3.After editing, the generated glb/gltf files may not open properly in third-party software. Please use software developed with Three.js to open them, as the saved files contain 
    Three.js-specific attributes. We will develop support for saving glb/gltf files in a more universal format in the future.

Here are some additional relevant details about the software:

    1. Two material options are provided: Metal and Glass. "None" indicates that only the color will be modified without altering other properties of the original object.
    2.The "glb Sample" folder offers some glb models for reference. GLB (GL Transmission Format) and glTF (GL Transmission Format) are two file formats commonly used in the field of 3D graphics and rendering.
    3.The parameters "Clearcoat" and "ClearcoatRoughness" in the dialog box are properties used for material rendering in Three.js. For specific usage details, please refer to the official Three.js documentation.

For the next step of development:

The software will support aligning billboard views, and applying texture mapping. It should be noted that the models are initially edited using Blender software and then exported as glb files.

The provided installation package:
Two Windows installation packages have been compiled and are available for download and use.

License
Detectron2 is released under the MIT.
